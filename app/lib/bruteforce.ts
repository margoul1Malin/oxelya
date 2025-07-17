import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface BruteforceAttempt {
  ip: string
  cookieId: string
  attempts: number
  lastAttempt: Date
  blockedUntil?: Date
}

// Stockage en mémoire (en production, utilisez Redis)
const bruteforceStore = new Map<string, BruteforceAttempt>()

export async function checkBruteforce(request: NextRequest): Promise<{ blocked: boolean; remainingTime?: number }> {
  const ip = getClientIP(request)
  const cookieId = request.cookies.get('session_id')?.value || generateSessionId()
  
  const key = `${ip}:${cookieId}`
  const attempt = bruteforceStore.get(key)
  
  const now = new Date()
  
  // Si bloqué, vérifier si le blocage est expiré
  if (attempt?.blockedUntil && attempt.blockedUntil > now) {
    const remainingTime = Math.ceil((attempt.blockedUntil.getTime() - now.getTime()) / 1000)
    return { blocked: true, remainingTime }
  }
  
  // Si le blocage est expiré, réinitialiser
  if (attempt?.blockedUntil && attempt.blockedUntil <= now) {
    bruteforceStore.delete(key)
  }
  
  return { blocked: false }
}

export async function recordFailedAttempt(request: NextRequest): Promise<{ blocked: boolean; remainingTime?: number }> {
  const ip = getClientIP(request)
  const cookieId = request.cookies.get('session_id')?.value || generateSessionId()
  
  const key = `${ip}:${cookieId}`
  const now = new Date()
  
  let attempt = bruteforceStore.get(key)
  
  if (!attempt) {
    attempt = {
      ip,
      cookieId,
      attempts: 0,
      lastAttempt: now
    }
  }
  
  attempt.attempts += 1
  attempt.lastAttempt = now
  
  // Bloquer après 3 tentatives échouées
  if (attempt.attempts >= 3) {
    const blockedUntil = new Date(now.getTime() + 5 * 60 * 1000) // 5 minutes
    attempt.blockedUntil = blockedUntil
    
    // Envoyer un email d'alerte
    await sendBruteforceAlert(ip, cookieId, attempt.attempts)
    
    bruteforceStore.set(key, attempt)
    
    return { blocked: true, remainingTime: 300 } // 5 minutes en secondes
  }
  
  bruteforceStore.set(key, attempt)
  return { blocked: false }
}

export function recordSuccessfulAttempt(request: NextRequest): void {
  const ip = getClientIP(request)
  const cookieId = request.cookies.get('session_id')?.value || generateSessionId()
  
  const key = `${ip}:${cookieId}`
  bruteforceStore.delete(key) // Réinitialiser les tentatives
}

export function setSessionCookie(response: NextResponse): NextResponse {
  const sessionId = generateSessionId()
  response.cookies.set('session_id', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 jours
  })
  return response
}

function getClientIP(request: NextRequest): string {
  // Vérifier les headers proxy
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  // Fallback sur l'IP directe (pour le développement)
  return 'unknown'
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

async function sendBruteforceAlert(ip: string, cookieId: string, attempts: number): Promise<void> {
  try {
    const subject = '🚨 Alerte Sécurité - Tentative de Bruteforce Détectée'
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; color: #ff6b6b;">🚨 ALERTE SÉCURITÉ</h1>
          <p style="margin: 10px 0; font-size: 18px; opacity: 0.9;">Tentative de Bruteforce Détectée</p>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0 0 15px 0; color: #ff6b6b;">Détails de l'Incident</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ffd93d;">📍 Adresse IP :</strong>
            <span style="margin-left: 10px; font-family: monospace; background: rgba(0, 0, 0, 0.3); padding: 5px 10px; border-radius: 4px;">${ip}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ffd93d;">🍪 Session ID :</strong>
            <span style="margin-left: 10px; font-family: monospace; background: rgba(0, 0, 0, 0.3); padding: 5px 10px; border-radius: 4px;">${cookieId}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ffd93d;">🔢 Nombre de Tentatives :</strong>
            <span style="margin-left: 10px; background: #ff6b6b; padding: 5px 10px; border-radius: 4px; font-weight: bold;">${attempts}</span>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #ffd93d;">⏰ Heure de Détection :</strong>
            <span style="margin-left: 10px;">${new Date().toLocaleString('fr-FR')}</span>
          </div>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 15px 0; color: #6bcf7f;">🛡️ Actions Automatiques</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">✅ IP et Session bloquées pendant 5 minutes</li>
            <li style="margin-bottom: 8px;">✅ Tentatives de connexion suspendues</li>
            <li style="margin-bottom: 8px;">✅ Notification d'alerte envoyée</li>
          </ul>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 8px;">
          <h3 style="margin: 0 0 15px 0; color: #ffd93d;">📋 Recommandations</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">🔍 Surveiller cette IP pour d'autres activités suspectes</li>
            <li style="margin-bottom: 8px;">📊 Analyser les logs d'accès pour identifier les patterns</li>
            <li style="margin-bottom: 8px;">🛡️ Considérer l'ajout de CAPTCHA ou 2FA si nécessaire</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
          <p style="margin: 0; opacity: 0.8; font-size: 14px;">
            Cet email a été généré automatiquement par le système de sécurité d'Oxelya.
          </p>
        </div>
      </div>
    `
    
    // Utiliser nodemailer directement pour l'alerte de bruteforce
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    })
    
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'admin@oxelya.com',
      subject,
      html
    })
    
    console.log(`🚨 Alerte bruteforce envoyée pour IP: ${ip}, Cookie: ${cookieId}, Tentatives: ${attempts}`)
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'alerte bruteforce:', error)
  }
} 
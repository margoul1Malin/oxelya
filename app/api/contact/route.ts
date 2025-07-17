import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'
import { sendContactNotification } from '../../lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Création du contact
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message
      }
    })

    // Envoi de l'email de notification
    try {
      console.log('📧 Tentative d\'envoi de notification pour le contact:', contact.id)
      await sendContactNotification({ name, email, subject, message })
      console.log('✅ Notification envoyée avec succès')
    } catch (emailError) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', emailError)
      // On ne fait pas échouer la requête si l'email échoue
      // mais on log l'erreur pour le debug
    }

    return NextResponse.json(
      { 
        message: 'Demande de contact envoyée avec succès',
        contactId: contact.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur lors de la création du contact:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
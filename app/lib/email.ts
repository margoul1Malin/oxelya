import nodemailer from 'nodemailer'

// Vérification de la configuration SMTP
const checkSMTPConfig = () => {
  const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS']
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    console.error('❌ Configuration SMTP manquante:', missing)
    return false
  }
  
  console.log('✅ Configuration SMTP trouvée:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || '587',
    user: process.env.SMTP_USER,
    adminEmail: process.env.ADMIN_EMAIL
  })
  
  return true
}

// Création du transporteur avec vérification
const createTransporter = () => {
  if (!checkSMTPConfig()) {
    throw new Error('Configuration SMTP manquante')
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Ajout de logs pour le debug
    logger: true,
    debug: true
  })
}

// Template de base pour tous les emails
const getBaseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oxelya - Excellence Evolutivité & Résultats</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .header {
            background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
            pointer-events: none;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .tagline {
            color: rgba(255,255,255,0.9);
            font-size: 16px;
            font-weight: 500;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 24px;
        }
        
        .info-item {
            background: #f8fafc;
            padding: 16px;
            border-radius: 12px;
            border-left: 4px solid #06b6d4;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        
        .info-value {
            color: #1f2937;
            font-size: 16px;
        }
        
        .message-box {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            padding: 24px;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            margin: 24px 0;
        }
        
        .message-content {
            white-space: pre-wrap;
            line-height: 1.7;
            color: #374151;
        }
        
        .footer {
            background: #1f2937;
            color: #ffffff;
            padding: 30px;
            text-align: center;
        }
        
        .footer-content {
            max-width: 400px;
            margin: 0 auto;
        }
        
        .footer-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
            background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .contact-info {
            margin-bottom: 20px;
        }
        
        .contact-item {
            margin-bottom: 8px;
            font-size: 14px;
            color: #d1d5db;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-link {
            display: inline-block;
            margin: 0 8px;
            color: #06b6d4;
            text-decoration: none;
            font-weight: 500;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #374151 50%, transparent 100%);
            margin: 20px 0;
        }
        
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
            color: #ffffff;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 12px;
            }
            
            .header, .content, .footer {
                padding: 20px;
            }
            
            .logo {
                font-size: 28px;
            }
            
            .section-title {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">Oxelya</div>
            <div class="tagline">Excellence • Evolutivité • Résultats</div>
        </div>
        
        <div class="content">
            ${content}
        </div>
        
        <div class="footer">
            <div class="footer-content">
                <div class="footer-title">Oxelya</div>
                <div class="contact-info">
                    <div class="contact-item">📍 Bordeaux, France</div>
                    <div class="contact-item">📧 contact@oxelya.com</div>
                    <div class="contact-item">📞 +33 6 43 32 34 12</div>
                </div>
                <div class="divider"></div>
                <div class="social-links">
                    <a href="https://margoul1.dev" class="social-link">💻 Portfolio</a>
                    <a href="https://margoul1.xyz" class="social-link">🚀 Projets</a>
                    <a href="https://drhead.org" class="social-link">🛡️ DrHead</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`

export const sendContactNotification = async (contact: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  try {
    console.log('📧 Tentative d\'envoi de notification admin...')
    
    const transporter = createTransporter()
    
    const content = `
        <div class="section">
            <div class="section-title">📬 Nouvelle demande de contact</div>
            <div class="badge">Nouveau</div>
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">Nom</div>
                <div class="info-value">${contact.name}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Email</div>
                <div class="info-value">${contact.email}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Sujet</div>
                <div class="info-value">${contact.subject}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Date de réception</div>
                <div class="info-value">${new Date().toLocaleString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">💬 Message</div>
            <div class="message-box">
                <div class="message-content">${contact.message}</div>
            </div>
        </div>
        
        <div class="section">
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 16px; border-radius: 12px; border-left: 4px solid #f59e0b;">
                <div style="font-weight: 600; color: #92400e; margin-bottom: 8px;">⚡ Action requise</div>
                <div style="color: #78350f; font-size: 14px;">
                    Ce message nécessite une réponse dans les plus brefs délais. 
                    Connectez-vous au panel admin pour répondre au client.
                </div>
            </div>
        </div>
    `
    
    const mailOptions = {
      from: `"Oxelya Contact" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `📬 Nouvelle demande - ${contact.subject}`,
      html: getBaseTemplate(content)
    }

    console.log('📧 Configuration email:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })

    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Email de notification admin envoyé avec succès:', result.messageId)
    return result

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la notification admin:', error)
    throw error
  }
}

export const sendReplyToContact = async (contact: {
  name: string
  email: string
}, reply: {
  content: string
  adminName: string
}) => {
  try {
    console.log('📧 Tentative d\'envoi de réponse au client...')
    
    const transporter = createTransporter()
    
    const content = `
        <div class="section">
            <div class="section-title">💌 Réponse à votre demande</div>
        </div>
        
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 24px;">
            <div style="font-weight: 600; color: #065f46; margin-bottom: 8px;">✅ Demande traitée</div>
        </div>
        
        <div class="section">
          <div class="message-box">
              <div class="message-content">${reply.content}</div>
          </div>
        </div>
        
        <div class="section">
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">Répondu par</div>
                    <div class="info-value">${reply.adminName}</div>
                    <div class="info-value">${new Date().toLocaleString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</div>
                  </div>
            </div>
        </div>
        
        <div class="section">
            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 16px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                <div style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">💡 Besoin d'aide supplémentaire ?</div>
                <div style="color: #1e3a8a; font-size: 14px;">
                    Si vous avez d'autres questions, n'hésitez pas à nous recontacter. 
                    Notre équipe reste à votre disposition pour vous accompagner.
                </div>
            </div>
        </div>
    `
    
    const mailOptions = {
      from: `"${reply.adminName} - Oxelya" <${process.env.SMTP_USER}>`,
      to: contact.email,
      subject: `💌 Réponse à votre demande - Oxelya`,
      html: getBaseTemplate(content)
    }

    console.log('📧 Configuration email de réponse:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })

    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Email de réponse au client envoyé avec succès:', result.messageId)
    return result

  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de la réponse au client:', error)
    throw error
  }
}

// Fonction de test de la configuration SMTP
export const testSMTPConnection = async () => {
  try {
    console.log('🧪 Test de la connexion SMTP...')
    const transporter = createTransporter()
    await transporter.verify()
    console.log('✅ Connexion SMTP réussie !')
    return true
  } catch (error) {
    console.error('❌ Échec de la connexion SMTP:', error)
    return false
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { getAdminFromToken } from '../../../../../lib/auth'
import { sendReplyToContact } from '../../../../../lib/email'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Vérification de l'authentification
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const admin = await getAdminFromToken(token)

    if (!admin) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 401 }
      )
    }

    const { content } = await request.json()

    // Validation du contenu
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: 'Le contenu de la réponse est requis' },
        { status: 400 }
      )
    }

    // Récupération du contact
    const contact = await prisma.contact.findUnique({
      where: { id: id }
    })

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact non trouvé' },
        { status: 404 }
      )
    }

    // Création de la réponse
    const reply = await prisma.reply.create({
      data: {
        content: content.trim(),
        contactId: id,
        adminId: admin.id
      },
      include: {
        admin: {
          select: {
            username: true
          }
        }
      }
    })

    // Mise à jour du statut du contact si nécessaire
    if (contact.status === 'PENDING') {
      await prisma.contact.update({
        where: { id: id },
        data: { 
          status: 'IN_PROGRESS',
          adminId: admin.id
        }
      })
    }

    // Envoi de l'email de réponse
    try {
      console.log('📧 Tentative d\'envoi de réponse au client:', contact.email)
      await sendReplyToContact(
        { name: contact.name, email: contact.email },
        { content: content.trim(), adminName: admin.username }
      )
      console.log('✅ Réponse envoyée avec succès au client')
    } catch (emailError) {
      console.error('❌ Erreur lors de l\'envoi de l\'email de réponse:', emailError)
      // On ne fait pas échouer la requête si l'email échoue
      // mais on log l'erreur pour le debug
    }

    return NextResponse.json({
      message: 'Réponse ajoutée avec succès',
      reply
    }, { status: 201 })

  } catch (error) {
    console.error('Erreur lors de l\'ajout de la réponse:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
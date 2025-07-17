import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getAdminFromToken } from '../../../../lib/auth'

export async function PATCH(
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

    const { status, adminId } = await request.json()

    // Validation du statut
    const validStatuses = ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Statut invalide' },
        { status: 400 }
      )
    }

    // Mise à jour du contact
    const contact = await prisma.contact.update({
      where: { id: id },
      data: {
        ...(status && { status }),
        ...(adminId && { adminId })
      },
      include: {
        admin: {
          select: {
            username: true
          }
        },
        replies: {
          include: {
            admin: {
              select: {
                username: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    return NextResponse.json({
      message: 'Contact mis à jour avec succès',
      contact
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du contact:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getAdminFromToken } from '../../../lib/auth'

export async function GET(request: NextRequest) {
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

    // Récupération des paramètres de pagination
    const searchParams = await request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    // Construction des filtres
    const where: any = {}
    
    if (status && status !== 'ALL') {
      where.status = status
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Récupération des contacts avec pagination
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
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
      }),
      prisma.contact.count({ where })
    ])

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
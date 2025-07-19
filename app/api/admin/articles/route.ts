import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'

// GET - Récupérer tous les articles
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
    const admin = await verifyToken(token)
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }

    // Récupération des paramètres de pagination
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    // Construction des filtres
    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status === 'published') {
      where.published = true
    } else if (status === 'draft') {
      where.published = false
    }

    // Récupération des articles
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          admin: {
            select: {
              username: true
            }
          },
          comments: {
            select: {
              id: true
            }
          },
          ratings: {
            select: {
              rating: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.article.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit
      }
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// POST - Créer un nouvel article
export async function POST(request: NextRequest) {
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
    const admin = await verifyToken(token)
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }

    const { title, content, slug, imageUrl, excerpt, published, metaTitle, metaDesc, metaKeywords } = await request.json()

    // Validation des données
    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: 'Titre, contenu et slug sont requis' },
        { status: 400 }
      )
    }

    // Vérification de l'unicité du slug
    const existingArticle = await prisma.article.findUnique({
      where: { slug }
    })

    if (existingArticle) {
      return NextResponse.json(
        { error: 'Un article avec ce slug existe déjà' },
        { status: 400 }
      )
    }

    // Création de l'article
    const article = await prisma.article.create({
      data: {
        title,
        content,
        slug,
        imageUrl: imageUrl || null,
        excerpt: excerpt || null,
        published: published || false,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        metaKeywords: metaKeywords || null,
        adminId: admin.adminId
      },
      include: {
        admin: {
          select: {
            username: true
          }
        }
      }
    })

    return NextResponse.json(
      { 
        message: 'Article créé avec succès',
        article 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
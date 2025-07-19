import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/auth'
import { prisma } from '../../../../lib/prisma'

// GET - Récupérer un article spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
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

    // Récupérer l'article
    const article = await prisma.article.findUnique({
      where: { id: resolvedParams.id },
      include: {
        admin: {
          select: {
            username: true
          }
        }
      }
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier que l'article appartient à l'admin
    if (article.adminId !== admin.adminId) {
      return NextResponse.json(
        { error: 'Non autorisé à accéder à cet article' },
        { status: 403 }
      )
    }

    return NextResponse.json(article, { status: 200 })

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// PATCH - Modifier un article
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return await updateArticle(request, params)
}

// PUT - Modifier un article (alias de PATCH)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return await updateArticle(request, params)
}

async function updateArticle(
  request: NextRequest,
  params: Promise<{ id: string }>
) {
  const resolvedParams = await params
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

    // Vérifier que l'article existe et appartient à l'admin
    const existingArticle = await prisma.article.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    if (existingArticle.adminId !== admin.adminId) {
      return NextResponse.json(
        { error: 'Non autorisé à modifier cet article' },
        { status: 403 }
      )
    }

    // Vérifier l'unicité du slug si modifié
    if (slug && slug !== existingArticle.slug) {
      const slugExists = await prisma.article.findUnique({
        where: { slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Un article avec ce slug existe déjà' },
          { status: 400 }
        )
      }
    }

    // Mise à jour de l'article
    const updatedArticle = await prisma.article.update({
      where: { id: resolvedParams.id },
      data: {
        title: title || undefined,
        content: content || undefined,
        slug: slug || undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        excerpt: excerpt !== undefined ? excerpt : undefined,
        published: published !== undefined ? published : undefined,
        metaTitle: metaTitle !== undefined ? metaTitle : undefined,
        metaDesc: metaDesc !== undefined ? metaDesc : undefined,
        metaKeywords: metaKeywords !== undefined ? metaKeywords : undefined,
        updatedAt: new Date()
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
        message: 'Article modifié avec succès',
        article: updatedArticle 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de la modification de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
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

    // Vérifier que l'article existe et appartient à l'admin
    const existingArticle = await prisma.article.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }

    if (existingArticle.adminId !== admin.adminId) {
      return NextResponse.json(
        { error: 'Non autorisé à supprimer cet article' },
        { status: 403 }
      )
    }

    // Supprimer l'article (les commentaires et notes seront supprimés automatiquement via onDelete: Cascade)
    await prisma.article.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json(
      { message: 'Article supprimé avec succès' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
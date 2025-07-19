import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { articleId, authorName, authorEmail, content } = await request.json()

    // Validation des données
    if (!articleId || !authorName || !content) {
      return NextResponse.json(
        { message: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Vérifier que l'article existe et est publié
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
        published: true
      }
    })

    if (!article) {
      return NextResponse.json(
        { message: 'Article non trouvé' },
        { status: 404 }
      )
    }

    // Créer le commentaire
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorName: authorName.trim(),
        authorEmail: authorEmail?.trim() || null,
        articleId
      }
    })

    // Revalider la page de l'article
    revalidatePath(`/blog/${article.slug}`)

    return NextResponse.json(
      { message: 'Commentaire ajouté avec succès', comment },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
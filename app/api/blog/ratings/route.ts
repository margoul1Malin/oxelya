import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { articleId, rating, authorName, authorEmail } = await request.json()

    // Validation des données
    if (!articleId || !authorName || !rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Données manquantes ou note invalide' },
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

    // Créer la note
    const ratingRecord = await prisma.rating.create({
      data: {
        rating,
        authorName: authorName.trim(),
        authorEmail: authorEmail?.trim() || null,
        articleId
      }
    })

    return NextResponse.json(
      { message: 'Note ajoutée avec succès', rating: ratingRecord },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'ajout de la note:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
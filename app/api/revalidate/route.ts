import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, path } = body

    // Vérifier le secret pour la sécurité
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalider la page blog
    revalidatePath('/blog')
    
    return NextResponse.json({ 
      message: 'Blog page revalidated successfully',
      revalidated: true,
      now: Date.now()
    })
  } catch (error) {
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 
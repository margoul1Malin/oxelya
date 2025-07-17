import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin, generateToken } from '../../../lib/auth'
import { checkBruteforceAdvanced, recordFailedAttemptAdvanced, recordSuccessfulAttemptAdvanced, setSessionCookie } from '../../../lib/bruteforce-advanced'

export async function POST(request: NextRequest) {
  try {
    // Vérification anti-bruteforce
    const bruteforceCheck = await checkBruteforceAdvanced(request)
    if (bruteforceCheck.blocked) {
      return NextResponse.json(
        { 
          error: `Trop de tentatives échouées. Réessayez dans ${Math.ceil(bruteforceCheck.remainingTime! / 60)} minutes. (Gros Looser)`,
          blocked: true,
          remainingTime: bruteforceCheck.remainingTime
        },
        { status: 429 }
      )
    }

    const { username, password } = await request.json()

    // Validation des données
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Nom d\'utilisateur et mot de passe requis' },
        { status: 400 }
      )
    }

    // Authentification
    const admin = await authenticateAdmin(username, password)

    if (!admin) {
      // Enregistrer la tentative échouée
      const failedAttempt = await recordFailedAttemptAdvanced(request)
      
      if (failedAttempt.blocked) {
        return NextResponse.json(
          { 
            error: `Trop de tentatives échouées. Réessayez dans ${Math.ceil(failedAttempt.remainingTime! / 60)} minutes.`,
            blocked: true,
            remainingTime: failedAttempt.remainingTime
          },
          { status: 429 }
        )
      }
      
      return NextResponse.json(
        { error: 'Identifiants invalides' },
        { status: 401 }
      )
    }

    // Enregistrer la tentative réussie (réinitialiser le compteur)
    await recordSuccessfulAttemptAdvanced(request)

    // Génération du token JWT
    const token = generateToken({
      adminId: admin.id,
      username: admin.username,
      role: admin.role
    })

    // Créer la réponse avec le cookie de session
    const response = NextResponse.json({
      message: 'Authentification réussie',
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      },
      token
    })

    // Ajouter le cookie de session
    return setSessionCookie(response)

  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 
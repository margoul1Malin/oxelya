import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
  adminId: string
  username: string
  role: string
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    console.error('Erreur:', error)
    return null
  }
}

export const authenticateAdmin = async (username: string, password: string) => {
  const admin = await prisma.admin.findUnique({
    where: { username }
  })

  if (!admin) {
    return null
  }

  const isValidPassword = await comparePassword(password, admin.password)
  
  if (!isValidPassword) {
    return null
  }

  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role
  }
}

export const getAdminFromToken = async (token: string) => {
  const payload = verifyToken(token)
  if (!payload) return null

  const admin = await prisma.admin.findUnique({
    where: { id: payload.adminId }
  })

  return admin
} 
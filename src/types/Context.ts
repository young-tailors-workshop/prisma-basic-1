import { Request } from 'express'
import { Prisma } from '../generated/prisma-client'

export interface IContext {
  prisma: Prisma
  request: Request
}

export interface JWTPayload {
  id: string
  iat: number
}

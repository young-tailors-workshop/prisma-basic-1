import * as JWT from 'jsonwebtoken'
import { IContext, JWTPayload } from '../types/Context'

export const SECRET_JWT = 'Ahihifkdjfk'

export function signToken(userId: string) {
  const token = JWT.sign(
    {
      id: userId,
    },
    SECRET_JWT,
  )

  return token
}

export async function getUserByToken({ request, prisma }: IContext) {
  const { headers } = request
  try {
    const token = headers.authorization!.split(' ')[1]
    if (!token) {
      throw 'Please login or sign up before request'
    }
    const payload = JWT.verify(token, SECRET_JWT)
    const { id } = payload as JWTPayload
    const user = await prisma.user({
      id,
    })
    if (!user) {
      throw 'User not exists'
    }
    return user
  } catch (e) {
    throw e
  }
}

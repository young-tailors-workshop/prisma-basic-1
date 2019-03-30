import * as Bcrypt from 'bcryptjs'
import { IContext } from '../types/Context'
import { SECRET_JWT, signToken, getUserByToken } from '../utils'

async function createPost(_, args, { prisma, request }: IContext) {
  try {
    const user = await getUserByToken({ prisma, request })
    const { title, body } = args
    const post = await prisma.createPost({
      title,
      body,
      postedBy: {
        connect: {
          id: user.id,
        },
      },
    })
    return post
  } catch (e) {
    throw e
  }
}

async function signUp(_, args, { prisma }: IContext) {
  try {
    const { name, email, password } = args
    const hashPassword = await Bcrypt.hash(password, 10)
    const user = await prisma.createUser({
      name,
      email,
      password: hashPassword,
    })

    const token = signToken(user.id)
    return {
      user,
      token,
    }
  } catch (e) {
    throw e
  }
}

async function login(_, args, { prisma }: IContext) {
  try {
    const { email, password } = args
    const user = await prisma.user({
      email,
    })
    if (!user) {
      throw 'User not exists'
    }
    const verify = await Bcrypt.compare(password, user.password)
    if (!verify) {
      throw 'Wrong password'
    }
    const token = signToken(user.id)
    return {
      user,
      token,
    }
  } catch (e) {
    throw e
  }
}

export default {
  createPost,
  signUp,
  login,
}

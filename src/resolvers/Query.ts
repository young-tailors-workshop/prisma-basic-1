import { IContext } from '../types/Context'
import { getUserByToken } from '../utils'

async function feed(_, args, { prisma }: IContext) {
  const { skip, first } = args
  const posts = await prisma.posts({
    skip,
    first,
  })
  return {
    posts,
  }
}

async function me(_, __, context: IContext) {
  const user = await getUserByToken(context)
  return user
}

export default {
  feed,
  me,
}

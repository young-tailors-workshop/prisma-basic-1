import { IContext } from '../types/Context'

async function posts(parent, args, { prisma }: IContext) {
  return prisma.user({ id: parent.id }).posts()
}

export default {
  posts,
}

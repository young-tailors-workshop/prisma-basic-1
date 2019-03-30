import { IContext } from '../types/Context'

async function postedBy(parent, args, { prisma }: IContext) {
  const { id } = parent
  const user = await prisma.post({ id }).postedBy()
  return user
}

export default {
  postedBy,
}

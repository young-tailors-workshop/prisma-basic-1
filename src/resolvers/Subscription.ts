import { IContext } from '../types/Context'

async function newPostSubscribe(_, __, { prisma }: IContext) {
  return prisma.$subscribe
    .post({
      mutation_in: ['CREATED'],
    })
    .node()
}

const newPost = {
  subscribe: newPostSubscribe,
  resolve: payload => payload,
}

export default {
  newPost,
}

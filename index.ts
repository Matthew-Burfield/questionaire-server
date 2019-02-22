import { prisma } from "./generated/prisma-client";
import { GraphQLServer } from "graphql-yoga";

const resolvers = {
  Query: {
    publishedPosts(parent, args, context) {
      return context.prisma.posts({ where: { published: true } });
    },
    post(parent, args, context) {
      return context.prisma.post({ id: args.postId });
    },
    postsByUser(parent, args, context) {
      return context.prisma
        .user({
          id: args.userId
        })
        .posts();
    },
    questions(parent, args, context) {
      return context.prisma.questions();
    }
  },
  Mutation: {
    createDraft(parent, args, context) {
      return context.prisma.createPost({
        title: args.title,
        author: {
          connect: { id: args.userId }
        }
      });
    },
    publish(parent, args, context) {
      return context.prisma.updatePost({
        where: { id: args.postId },
        data: { published: true }
      });
    },
    createUser(parent, args, context) {
      return context.prisma.createUser({ name: args.name });
    },
    createQuestion(parent, args, context) {
      return context.prisma.createQuestion({ question: args.question });
    },
    async increaseScore(parent, args, context) {
      const question = await context.prisma.question({ id: args.questionId });
      return context.prisma.updateQuestion({
        where: { id: args.questionId },
        data: { thumbsUpCount: question.thumbsUpCount + 1 }
      });
    },
    async decreaseScore(parent, args, context) {
      const question = await context.prisma.question({ id: args.questionId });
      return context.prisma.updateQuestion({
        where: { id: args.questionId },
        data: { thumbsDownCount: question.thumbsDownCount + 1 }
      });
    }
  },
  User: {
    posts(parent, args, context) {
      return context.prisma
        .user({
          id: parent.id
        })
        .posts();
    }
  },
  Post: {
    author(parent, args, context) {
      return context.prisma
        .post({
          id: parent.id
        })
        .author();
    }
  }
};

const origin =
  process.env.NODE_ENV === "production"
    ? "https://burfield-questionaire.now.sh"
    : "http://localhost:3000";

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma
  }
});

server.start(
  {
    cors: {
      origin,
      credentials: true
    }
  },
  () => console.log("🚀 Server is running on http://localhost:4000")
);

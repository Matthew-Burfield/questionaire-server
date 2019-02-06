const { GraphQLServer } = require("graphql-yoga");

const questions = [
  {
    id: 1,
    sessionId: 1,
    question:
      "When you are old, what do you think children will ask you to tell stories about?",
    thumbsUpCount: 2,
    thumbsDownCount: 0,
    hasBeenAsked: false,
    hasBeenApproved: true
  },
  {
    id: 2,
    sessionId: 1,
    question:
      "If you could switch two movie characters, what switch would lead to the most inappropriate movies?",
    thumbsUpCount: 5,
    thumbsDownCount: 1,
    hasBeenAsked: false,
    hasBeenApproved: true
  },
  {
    id: 3,
    sessionId: 1,
    question:
      "What animal would be cutest if scaled down to the size of a cat?",
    thumbsUpCount: 0,
    thumbsDownCount: 2,
    hasBeenAsked: false,
    hasBeenApproved: true
  },
  {
    id: 4,
    sessionId: 1,
    question:
      "What inanimate object would be the most annoying if it played loud upbeat music while being used?",
    thumbsUpCount: 0,
    thumbsDownCount: 1,
    hasBeenAsked: false,
    hasBeenApproved: true
  },
  {
    id: 5,
    sessionId: 1,
    question:
      "When did something start out badly for you but in the end, it was great?",
    thumbsUpCount: 1,
    thumbsDownCount: 0,
    hasBeenAsked: false,
    hasBeenApproved: true
  }
];
let idCount = questions.length + 1;

const resolvers = {
  Query: {
    question: (parent, args) =>
      questions.find(question => question.id === args.id),
    questions: () => questions
  },
  Mutation: {
    addQuestion: (parent, args) => {
      const newQuestion = {
        id: idCount++,
        sessionId: 1,
        question: args.question,
        thumbsUpCount: 0,
        thumbsDownCount: 0,
        hasBeenAsked: false,
        hasBeenApproved: false
      };
      questions.push(newQuestion);
      return newQuestion;
    }
  }
};

const typeDefs = `
  type Query {
    question(id: ID!): Question
    questions: [Question!]!
  }

  type Mutation {
    addQuestion(question: String!): Question!
  }

  type Question {
    id: ID!
    sessionId: ID
    question: String!
    thumbsUpCount: Int
    thumbsDownCount: Int
    hasBeenAsked: Boolean
    hasBeenApproved: Boolean
  }
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

const origin =
  process.env.NODE_ENV === "production"
    ? "https://burfield-questionaire.now.sh"
    : "http://localhost:3000";

server.start(
  {
    cors: {
      origin,
      credentials: true
    }
  },
  () => console.log("🚀 Server is running on localhost:4000")
);

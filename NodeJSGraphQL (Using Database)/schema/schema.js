const graphql = require("graphql");
const Players = require("../model/Player");
const Teams = require("../model/Team");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    league: { type: GraphQLString },
    players: {
      type: new GraphQLList(PlayerType),
      resolve: async (parent, args) =>
        await Players.findAll({
          where: {
            teamId: parent.id
          }
        })
    }
  })
});

const PlayerType = new GraphQLObjectType({
  name: "Player",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    rating: { type: GraphQLInt },
    team: {
      type: new GraphQLList(TeamType),
      resolve: async (parent, args) =>
        await Teams.findAll({
          where: {
            id: parent.teamId
          }
        })
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    team: {
      type: new GraphQLList(TeamType),

      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        return await Teams.findAll({
          where: {
            id: args.id
          }
        });
      }
    },
    teams: {
      type: new GraphQLList(TeamType),

      resolve: async () => {
        console.log(await Teams.findAll());
        return await Teams.findAll();
      }
    },
    player: {
      type: new GraphQLList(PlayerType),
      args: { name: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return await Players.findAll({ where: { name: args.name } });
      }
    },
    players: {
      type: new GraphQLList(PlayerType),

      resolve: async () => await Players.findAll()
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Muatation",
  fields: () => ({
    addTeam: {
      type: TeamType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        league: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const newTeam = await Teams.create({
          name: args.name,
          league: args.league
        });

        return newTeam;
      }
    },
    addPlayer: {
      type: PlayerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLInt) },
        teamId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        const newPlayer = await Players.create({
          name: args.name,
          rating: args.rating,
          teamId: args.teamId
        });
        return newPlayer;
      }
    },
    deleteTeam: {
      type: TeamType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await Teams.destroy({
          where: {
            id: args.id
          }
        });
      }
    },
    deletePlayer: {
      type: PlayerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (parent, args) => {
        return await Players.destroy({
          where: {
            id: args.id
          }
        });
      }
    },
    updatePlayer: {
      type: PlayerType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        rating: {
          type: GraphQLInt
        },
        teamId: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        return await Players.update(
          {
            name: args.name,
            rating: args.rating,
            teamId: args.teamId
          },
          {
            where: {
              id: args.id
            }
          }
        );
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

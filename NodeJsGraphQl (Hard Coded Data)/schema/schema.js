const graphql = require("graphql");
const { Teams, Players } = require("../database/data");
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
      resolve: (parent, args) => {
        return Players.filter(player => player.teamId === parent.id);
      }
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
      type: TeamType,
      resolve: (parent, args) => Teams.find(team => team.id === parent.teamId)
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    team: {
      type: TeamType,

      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return Teams.find(team => team.id === args.id);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),

      resolve: () => Teams
    },
    player: {
      type: PlayerType,
      args: { name: { type: GraphQLString } },
      resolve: (parent, args) => {
        return Players.find(player => player.name === args.name);
      }
    },
    players: {
      type: new GraphQLList(PlayerType),

      resolve: () => Players
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: "Muatation",
  fields: () => ({
    addTeam: {
      type: TeamType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        league: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const newTeam = {
          id: args.id,
          name: args.name,
          league: args.league
        };
        Teams.push(newTeam);
        return newTeam;
      }
    },
    addPlayer: {
      type: PlayerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLInt) },
        teamId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const newPlayer = {
          id: args.id,
          name: args.name,
          rating: args.rating,
          teamId: args.teamId
        };
        Players.push(newPlayer);
        return newPlayer;
      }
    },
    deleteTeam: {
      type: TeamType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const index = Teams.findIndex(team => team.id === args.id);
        const team = Teams[index];
        Teams.splice(index, 1);
        return team;
      }
    },
    deletePlayer: {
      type: PlayerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const index = Players.findIndex(player => player.id === args.id);
        const player = Players[index];
        Players.splice(index, 1);
        return player;
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

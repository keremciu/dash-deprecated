import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntegerType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const LevelType = new ObjectType({
  name: 'LevelType',
  fields: {
    level: { type: new NonNull(IntegerType) },
    name: { type: new NonNull(StringType) },
    url: { type: new NonNull(StringType) },
  },
});

export default LevelType;

import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntegerType,
  GraphQLFloat as FloatType,
  GraphQLString as StringType,
} from 'graphql';

const PositionType = new ObjectType({
  name: 'PositionType',
  fields: {
    x: { type: FloatType },
    y: { type: FloatType },
    level: { type: IntegerType },
    userIdentifier: { type: StringType },
    lastSeenData: { type: StringType },
    rotationDegrees: { type: IntegerType },
  },
});

export default PositionType;

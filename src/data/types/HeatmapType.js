import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntegerType,
  GraphQLFloat as FloatType,
  GraphQLList as ListType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const PointType = new ObjectType({
  name: 'PointType',
  fields: {
    x: { type: FloatType },
    y: { type: FloatType },
    value: { type: IntegerType },
  },
});

const HeatmapType = new ObjectType({
  name: 'HeatmapType',
  fields: {
    key: { type: new NonNull(IntegerType) },
    value: { type: new ListType(PointType) },
  },
});

export default HeatmapType;

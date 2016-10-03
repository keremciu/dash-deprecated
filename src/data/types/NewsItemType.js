/**
 * Pointrlabs Webapp Project (http://pointr-node.pointrlabs.com/)
 *
 * Copyright © 2016 Pointr, LLC. All rights reserved.
 *
 * This source code is licensed under the VLK license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const NewsItemType = new ObjectType({
  name: 'NewsItem',
  fields: {
    title: { type: new NonNull(StringType) },
    link: { type: new NonNull(StringType) },
    author: { type: StringType },
    publishedDate: { type: new NonNull(StringType) },
    contentSnippet: { type: StringType },
  },
});

export default NewsItemType;

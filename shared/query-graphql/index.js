import { graphql } from 'graphql'
import {makeExecutableSchema} from "apollo-server-micro";

// import { schema } from '../../pages/api/graphql'
import { schema } from '../../pages/api/rm-graphql'
// import { sschema } from '../../utils/schema.graphql'
// const schema = makeExecutableSchema(sschema);
export default async function queryGraphql(query, variableValues = {}) {
  const { data } = await graphql({ schema, source: query, variableValues })
  return data || {}
}

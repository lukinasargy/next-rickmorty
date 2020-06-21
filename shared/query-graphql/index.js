import { graphql } from 'graphql'
import {makeExecutableSchema} from "apollo-server-micro";

// import { schema } from '../../pages/api/graphql'
import { schema } from '../../pages/api/rm-graphql'
// import { sschema } from '../../utils/schema.graphql'
// const schema = makeExecutableSchema(sschema);
const url = "https://rickandmortyapi.com/graphql/";

export default async function queryGraphql(query, variableValues = {}) {
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  };
  const { data } = await fetch(url, opts).then(response => response.json());
  return data || {}
}

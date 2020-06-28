import { graphql } from 'graphql'

const url = "https://rickandmortyapi.com/graphql/";

export default async function queryGraphql(query, variableValues = {}) {
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variableValues })
  };
  const { data } = await fetch(url, opts).then(response => response.json());
  return data || {}
}

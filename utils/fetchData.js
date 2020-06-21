const query = `
  query {
    character(id: "1") {
      name
    }
  }
`;
const url = "https://rickandmortyapi.com/graphql";
const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
};
// fetch(url, opts)
//     .then(res => res.json())
//     .then(console.log)
//     .catch(console.error);
export async function getData() {
    return await fetch(url, opts).then(response => response.json());
}
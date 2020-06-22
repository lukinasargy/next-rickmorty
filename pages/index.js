import Link from 'next/link'

import queryGraphql from '../shared/query-graphql'

export default function UserListing({ locations }) {
  return (
    <div>
      <h1>Location Listing</h1>
      {/*  {character.name}*/}
      {/*<img src={character.image} alt=""/>*/}

      {/*<ul>*/}
      {/*  {users.map((user) => (*/}
      {/*    <li key={user.username}>*/}
      {/*      <Link href="/[
      ]" as={`/${user.username}`}>*/}
      {/*        <a>{user.name}</a>*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
        <ul>
          {/*{locations.results}*/}
          {locations.results.map((location) => (
            <li key={location.name}>
              <Link href="/locations/[id]" as={`/locations/${location.id.toString()}`}>
                <a>{location.name}</a>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

export async function getStaticProps() {
  // const { character } = await queryGraphql(`
  //   query {
  //     character (id:"4") {
  //       name
  //       image
  //     }
  //   }
  // `);
  const { locations } = await queryGraphql(`
    query {
      locations {
        results {
            id
            name
            type
            residents{
                name
                image
             }
         }
      }
    }
  `)
  return { props: {  locations } }
}

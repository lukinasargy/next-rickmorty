import Link from 'next/link'

import queryGraphql from '../shared/query-graphql'

export default function UserListing({ character }) {
  return (
    <div>
      <h1>User Listing</h1>
        {character}
      {/*<ul>*/}
      {/*  {users.map((user) => (*/}
      {/*    <li key={user.username}>*/}
      {/*      <Link href="/[username]" as={`/${user.username}`}>*/}
      {/*        <a>{user.name}</a>*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  )
}

export async function getStaticProps() {
  const { character } = await queryGraphql(`
    query {
      character (id:"4") {
        name
      }
    }
  `)
  return { props: { character } }
}

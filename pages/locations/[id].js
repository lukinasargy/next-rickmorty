import queryGraphql from '../../shared/query-graphql'

export default function locationProfile({ location, locationid }) {

    if (!location) {
        return <h1>location Not Found {locationid}</h1>
    }
    return (
        <h1>
            {location.name} id is {location.id}
        </h1>
    )
}



export async function getStaticPaths() {
    const { locations } = await queryGraphql(`
    query {
      locations {
        results {
            name
            id
        }
      }
    }
  `)
    return {
        paths: locations.results.map(( location ) => ({
            params: { id : location.id.toString() },
        })),
        fallback: true,
    }
}
export async function getStaticProps(context) {
    const { params } = context
    const   locationid   = params.id;
    // const  locationid  = 1;
    let queryString = `
    query  {
    location (id: $locationid) {
     id
     name
     type
      residents{
                name
                image
             }
     }
     }
  `.replace('$locationid', locationid);
    const { location  = null} = await queryGraphql(queryString)
    return { props: { location } }
}
import queryGraphql from '../../shared/query-graphql';
import Layout from '../../components/layout';
export default function locationProfile({ location }) {

    if (!location) {
        return (
            <Layout>
            <h1>location Not Found </h1>
            </Layout>
        )
    }
    return (
        <Layout>
            <h1>
            {location.name} id is {location.id}
        </h1>
        </Layout>
    )
}
// export async function getServerSidePaths() {
//     const { locations } = await queryGraphql(`
//     query {
//       locations {
//         results {
//             name
//             id
//         }
//       }
//     }
//   `)
//     return {
//         paths: locations.results.map(( location ) => ({
//             params: { id : location.id.toString() },
//         })),
//         fallback: true,
//     }
// }
export async function getServerSideProps(context) {
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
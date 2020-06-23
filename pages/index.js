import Link from 'next/link'
import React, {Component} from 'react';
import queryGraphql from '../shared/query-graphql'
import Layout from '../components/layout'
export default class LocationListing extends Component {
    state = {
        locations: this.props.locations.results.slice(0,20)
    };
    handleScroll = () =>  {
        let newLength = this.state.locations.length;
        if (newLength < this.props.locations.results.length) {
            newLength += 5;
        }
        const locationsNew = this.props.locations.results.slice(this.state.locations.length, newLength);
        let locationsUpdated = [...this.state.locations, ...locationsNew]
        this.setState({ locations:locationsUpdated });
    };
    render() {
        return (
            <Layout>
                <h1 onClick={this.handleScroll}>Location Listing</h1>
                <ul>
                    {this.state.locations.map((location) => (
                        <li key={location.name} >
                            <Link href="/locations/[id]" as={`/locations/${location.id.toString()}`}>
                                <a>{location.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        )
    }
}

export async function getServerSideProps() {
    // let locations = {results: []};
    // for (let i = 1;i < 6; i++) {
    //     let queryString = `query {
    //   locations(page: $page) {
    //     results {
    //         id
    //         name
    //         type
    //         residents{
    //             name
    //             image
    //          }
    //      }
    //   }
    // }`.replace('$page', '1');
    //     let {locationsAdded = null} = await queryGraphql(queryString);
    //     console.log(locationsAdded);
    //     locations.results = [...locations.results,...locationsAdded.results]
    // }
    const {locations} = await queryGraphql(`query {
      locations(page: $page) {
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
    }`.replace('$page', '1'));
    return {props: {locations}}
}

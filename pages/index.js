import Link from 'next/link'
import React, {Component} from 'react';
import queryGraphql from '../shared/query-graphql'

export default class LocationListing extends Component {
    state = {
        locations: this.props.locations.results
    };
    handleScroll = () =>  {
        let newLocations = this.state.locations;
        this.setState(({ locations }) => ({
            locations: [ ...locations, ...newLocations ],
        }));
    };
    render() {
        // this.addEventListener('scroll', this.handleScroll);
        return (
            <div onScroll={this.handleScroll}>
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
            </div>
        )
    }
}

export async function getStaticProps() {
    const {locations} = await queryGraphql(`
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
    return {props: {locations}}
}

import Link from 'next/link'
import React, {Component} from 'react';
import queryGraphql from '../shared/query-graphql'
import Layout from '../components/layout'
import classes from './index.module.css';
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

                                <a>
                                    {/*<div className={classes.location__type} locationtype={location.type}></div>*/}
                                    <img src={`/images/${location.type.toLowerCase() + '.png'}`} className={classes.location__type} alt={location.type}/>
                                    <h2>{location.name}</h2>
                                    <h3>{location.type}</h3>
                                    <ul>
                                        { (location['residents'][0]) ?
                                            (<li><img src={location['residents'][0]['image']} alt=""/></li>)
                                            : null}
                                        { (location['residents'][1]) ?
                                            (<li><img src={location['residents'][1]['image']} alt=""/></li>)
                                        : null}
                                        { (location['residents'][2]) ?
                                            (<li><img src={location['residents'][2]['image']} alt=""/></li>)
                                        : null}
                                    </ul>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        )
    }
}

export async function getServerSideProps() {
    let locations = {results: []};
    for (let i = 1;i < 6; i++) {
        let queryString = `query {
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
    }`.replace('$page', i.toString());
        let locationsAdded  = await queryGraphql(queryString);
        let added = {locationsAdded};
        locations.results = [...locations.results,...added.locationsAdded.locations.results]
    }
    // const {locations} = await queryGraphql(`query {
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
    // }`.replace('$page', '1'));
    // console.log(locations);
    return {props: {locations}}
}

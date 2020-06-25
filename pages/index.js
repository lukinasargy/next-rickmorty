import Link from 'next/link'
import React, {Component} from 'react';
import queryGraphql from '../shared/query-graphql'
import Layout from '../components/layout'
import classes from './index.module.css';

export default class LocationListing extends Component {
  state = {
    locations: this.props.locations.results.slice(0, 20)
  };
  handleScroll = () => {
    if ((window.pageYOffset + window.innerHeight) === window.document.body.offsetHeight) {
      let newLength = this.state.locations.length;
      if (newLength < this.props.locations.results.length) {
        newLength += 10;
      }
      const locationsNew = this.props.locations.results.slice(this.state.locations.length, newLength);
      let locationsUpdated = [...this.state.locations, ...locationsNew]
      this.setState({locations: locationsUpdated});
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  render() {
    return (
      <Layout>
        <div className="container">
          {/*<h1 onClick={this.handleScroll}>Location Listing</h1>*/}
          <ul className={classes.location__list}>
            {this.state.locations.map((location) => (
              <li key={location.name} className={classes.location__item}>
                <Link href="/locations/[id]" as={`/locations/${location.id.toString()}`}>
                  <a className={classes.location__link}>
                    <div className="location__typeimage" locationtype={location.type}></div>
                    {/*<img src={'/images/' + location.type.toLowerCase() + '.png'} className={classes.location__typeimage}*/}
                    {/*     alt={location.type}/>*/}
                    <h2 className={classes.location__name}>{location.name}</h2>
                    <h3 className={classes.location__type}>{location.type}</h3>
                    <ul className={classes.location__residents}>
                      {(location['residents'][0]) ?
                        (<li className={classes.location__resident}><img src={location['residents'][0]['image']}
                                                                         className={classes.location__residentimage}
                                                                         alt=""/></li>)
                        : null}
                      {(location['residents'][1]) ?
                        (<li className={classes.location__resident}><img src={location['residents'][1]['image']}
                                                                         className={classes.location__residentimage}
                                                                         alt=""/></li>)
                        : null}
                      {(location['residents'][2]) ?
                        (<li className={classes.location__resident}><img src={location['residents'][2]['image']}
                                                                         className={classes.location__residentimage}
                                                                         alt=""/></li>)
                        : null}
                    </ul>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}

export async function getServerSideProps() {
  let locations = {results: []};
  for (let i = 1; i < 6; i++) {
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
    let locationsAdded = await queryGraphql(queryString);
    let added = {locationsAdded};
    locations.results = [...locations.results, ...added.locationsAdded.locations.results]
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

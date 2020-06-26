import queryGraphql from '../../shared/query-graphql';
import Link from 'next/link';
import Layout from '../../components/layout';
import classes from './[id].module.css';
import React, {Component} from "react";

export default class locationProfile extends Component {
  state = {
    location: this.props.location,
    characters: this.props.location.residents.slice(0, 20)
  };
  handleScroll = () => {
    if ((window.pageYOffset + window.innerHeight) === window.document.body.offsetHeight) {
      let newLength = this.state.characters.length;
      if (newLength < this.props.location.residents.length) {
        newLength += 10;
      }
      const charactersNew = this.props.location.residents.slice(this.state.characters.length, newLength);
      let charactersUpdated = [...this.state.characters, ...charactersNew]
      this.setState({characters: charactersUpdated});
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
  render () {
    if (!this.state.location) {
      return (
        <Layout>
          <h1>location Not Found </h1>
        </Layout>
      )
    }
    const imageClasses = `location__typeimage ${classes.location__typeimage}`;
    return (
      <Layout>
        <div className={imageClasses} locationtype={this.state.location.type}>
          <Link href="../">
            <a className={classes.backlink}>
              <img src="/images/back.svg" alt="back link" className={classes.backlink__image}/>
            </a>
          </Link>
        </div>
        <div className="container">
          <div className={classes.info}>
            <h1 className={classes.info__name}>{this.state.location.name}</h1>
            <h3 className={classes.info__type}>{this.state.location.type}</h3>
          </div>
          <div className={classes.residents}>
            <h2 className={classes.residents__title}>Residents</h2>
            <ul className={classes.residents__list}>
              {this.state.characters.map((character) => (
                <li key={character.id} className={classes.character__item}>
                  <Link href="/characters/[id]" as={`/characters/${character.id.toString()}`}>
                    <a className={classes.character__link}>
                      <img src={character.image} className={classes.character__image}/>
                      <div className={classes.character__info}>
                        <h3 className={classes.character__name}>{character.name}</h3>
                        <h4 className={classes.character__location}>{character.location.name}</h4>
                        <h4 className={classes.character__species}>{character.species}</h4>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
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
  const {params} = context
  const locationid = params.id;
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
                id
                species
                location {
                  name
                }
             }
     }
     }
  `.replace('$locationid', locationid);
  const {location = null} = await queryGraphql(queryString)
  return {props: {location}}
}
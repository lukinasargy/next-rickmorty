import queryGraphql from '../../shared/query-graphql';
import Link from 'next/link';
import Layout from '../../components/layout';
import classes from './[id].module.css';
import React, {Component} from "react";

export default class LocationProfile extends Component {
  state = {
    location: this.props.location,
    characters: this.props.location ? this.props.location.residents.slice(0, 20) : null
  };
  handleScroll = () => {
    if ((window.pageYOffset + window.innerHeight) >= window.document.body.offsetHeight) {
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

  render() {
    if (!this.state.location) {
      return (
        <Layout>
          <div className="container">
            <h1 style={{textAlign: 'center'}}>Location Not Found </h1>
          </div>
        </Layout>
      )
    }
    return (
      <Layout>
        <div className="front">
          <div className={`front__image ${classes.location__typeimage}`} locationtype={this.state.location.type}>
          </div>
          <Link href="../">
            <a className="front__backlink">
              <img src="/images/back.svg" alt="back link"/>
            </a>
          </Link>
        </div>
        <div className="container">
          <div className={classes.info}>
            <h1 className={classes.info__name}>{this.state.location.name}</h1>
            <h3 className={classes.info__type}>{this.state.location.type}</h3>
          </div>
          {(this.props.location.residents[0]['name']) ? (
            <div className={classes.residents}>
              <h2 className={classes.residents__title}>Residents</h2>
              <ul className={classes.residents__list}>
                {this.state.characters.map((character) => (
                  <li key={character.id} className={classes.character__item}>
                    <Link href="/characters/[id]" as={`/characters/${character.id.toString()}`}>
                      <a className={classes.character__link}>
                        <img src={character.image} className={classes.character__image}/>
                        <div className={classes.character__info}>
                          <h3 className={`big  ${classes.character__name}`} title={character.name}>{character.name}</h3>
                          <h4 className="small">{character.location.name}</h4>
                          <h4 className="small">{character.species}</h4>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>) : (<div>No residents found</div>)

          }
        </div>
      </Layout>
    )
  }
}
export async function getServerSideProps(context) {
  const {params} = context
  const locationid = params.id;
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
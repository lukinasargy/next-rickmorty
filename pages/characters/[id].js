import queryGraphql from '../../shared/query-graphql';
import Link from 'next/link';
import Layout from '../../components/layout';
import classes from './[id].module.css';
import React from "react";

export default function CharacterProfile({ character }) {
  if (!character) {
    return (
      <Layout>
        <div className="container">
          <h1 style={{textAlign: 'center'}}>Character Not Found </h1>
        </div>
      </Layout>
    )
  }
  return (
   <Layout>
        <div className="front">
          <img src={character.image} alt="" className="front__image"/>
          <Link href="/locations/[id]" as={`/locations/${character.location.id.toString()}`}>
            <a className="front__backlink">
              <img src="/images/back.svg" alt="back link"/>
            </a>
          </Link>
        </div>
        <div className={`container ${classes.container}`}>
          <div className={classes.info}>
            <h1 className='big'>{character.name}</h1>
            <h3 className='small'>{character.location.name}</h3>
            <h3 className='small'>{character.species}</h3>
            <h2 className='big'>
              Status: <br/>
              {character.status}
            </h2>
            <h2 className='big'>
              Homeplanet: <br/>
              {character.origin.name}
            </h2>
          </div>
        </div>
      </Layout>
  )
}

export async function getServerSideProps(context) {
  const {params} = context;
  const characterId = params.id;
  // const  locationid  = 1;
  let queryString = `
    query  {
      character (id: $characterId) {
        id
        name
        image
        species
        status
        location {
          id
          name
        }
        origin {
          name  
        }
      }
     }
  `.replace('$characterId', characterId);
  const {character = null} = await queryGraphql(queryString)
  return {props: {character}}
}
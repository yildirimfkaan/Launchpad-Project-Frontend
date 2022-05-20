
import styles from '../styles/Home.module.css';

import { Link } from "@nextui-org/react";

import Card1 from '../components/Card1';

import {defaultEndpoint, api_json} from "./api/api_data";


export async function getStaticProps(){
  const res = await fetch(defaultEndpoint);
  const avalaunch_api_data = await res.json()
  return{
    props: {
      avalaunch_api_data
    }
  };
};


export default function Home( {avalaunch_api_data} ) {
  api_json = avalaunch_api_data;
  return (

        <>
        <h1 className={styles.title}>
          Token List
        </h1>
        <ul>
      <li>
        <Link href="/project/1">
          <a>Go to pages/post/[pid].js</a>
        </Link>
      </li>
    </ul>
        <Card1{...avalaunch_api_data} />


        </>
  );
};


//Built in support => .css .sass .scss CSS in JS (styled-jsx)
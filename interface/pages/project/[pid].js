import { useRouter } from 'next/router';
import { api_json } from "../api/api_data";




export default function detail() {
  
  console.log( api_json() ) ;

  const { query } = useRouter();
  
  

  return ( <> <p>Post: {query.pid}</p>  </> );
};


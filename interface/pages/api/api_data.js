//export const defaultEndpoint = 'https://avalaunch-kyc.herokuapp.com/api/v1/projects';


export async function api_json(){
    var res = await fetch("https://avalaunch-kyc.herokuapp.com/api/v1/projects").then(res => res.json() );
    return res['projects'];
     
  };


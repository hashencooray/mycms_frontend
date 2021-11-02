import {API_BASE_URL} from '../config/appConfig';


export const allUsers = async (tabletype) => {

    const requestOptions = {
        method: "GET"
    }

    const res =await fetch( API_BASE_URL+ `${tabletype}`, requestOptions)
    .catch( err => {console.error(err); return []})
    if (res.ok){
        return await res.json();
    }else{
        return false;
    }
}


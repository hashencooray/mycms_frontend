import {API_BASE_URL} from '../config/appConfig';


export const addNewUser = (data) => {

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch( API_BASE_URL+ `user/add/`, requestOptions)
            .then( res => res.json() )
            .then(data => {
                if (data.ok){
                    return true;
                }else{
                    return false;
                }
            })
            .catch( err => console.error(err));
}
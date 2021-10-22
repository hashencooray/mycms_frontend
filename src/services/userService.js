import {API_BASE_URL} from '../config/appConfig';


export const allUsers = () => {

    const requestOptions = {
        method: "GET",
        headers : {
            "Content-Type": "application/json"
        }
    }

    return fetch( API_BASE_URL+ `users`, requestOptions)
            .then( async res => {
                if (res.ok){
                    return await res.json();
                }else{
                    return false;
                }
            })
            .catch( err => console.error(err));
}

export const addNewUser = (data) => {

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    }

    return fetch( API_BASE_URL+ `user/new`, requestOptions)
            .then(res => {
                if (res.ok){
                    return res.json();
                }else{
                    return false;
                }
            })
            .catch( err => console.error(err));
}

export const editUser = (userId, data) => {

    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch( API_BASE_URL+ `user/${userId}`, requestOptions)
            .then(res => {
                if (res.ok){
                    return res.json();
                }else{
                    return false;
                }
            })
            .catch( err => console.error(err));
}

export const deleteUser = (userId) => {

    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch( API_BASE_URL+ `user/delete/${userId}`, requestOptions)
            .then(res => {
                if (res.ok){
                    return true;
                }else{
                    return false;
                }
            })
            .catch( err => console.error(err));
}
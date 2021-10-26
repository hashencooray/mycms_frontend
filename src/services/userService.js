import {API_BASE_URL} from '../config/appConfig';


export const allUsers = async () => {

    const requestOptions = {
        method: "GET"
    }

    const res =await fetch( API_BASE_URL+ `users`, requestOptions)
    console.log(res.status)
    if (res.ok){
        return await res.json();
    }else{
        return false;
    }
}

export const addNewUser = async (data) => {

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const res = await fetch( API_BASE_URL+ `user`, requestOptions)
    if (res.ok){
        return await res.json();
    }else{
        return false;
    }
}

export const editUser = async (userId, data) => {

    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const res = await fetch( API_BASE_URL+ `user/${userId}`, requestOptions);
    if (res.ok){
        return await res.json();
    }else{
        return false;
    }
}

export const deleteUser = async (userId) => {

    const requestOptions = {
        method: "DELETE"
    }

    const res =  await fetch( API_BASE_URL+ `user/${userId}`, requestOptions);
    if (res.ok){
        return true;
    }else{
        return false;
    }
}
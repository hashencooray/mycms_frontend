import {API_BASE_URL} from '../config/appConfig';


export const allUsers = async () => {

    const requestOptions = {
        method: "GET"
    }

    const res =await fetch( API_BASE_URL+ `users`, requestOptions)
    if (res.ok){
        return await res.json();
    }else{
        return false;
    }
}

export const addNewUser = async (tabletype,data) => {

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const res = await fetch( API_BASE_URL+`${tabletype}`, requestOptions)
    if (res.ok){
        return await res.json();
    }else{
        return false;
    }
}

export const editUser = async (tabletype,userId, data) => {

    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const res = await fetch( API_BASE_URL+ `${tabletype}/${userId}`, requestOptions);
    if (res.ok){
        return await res.json();
    }else{
        return false;
    }
}

export const deleteUser = async (tabletype,userId) => {

    const requestOptions = {
        method: "DELETE"
    }

    const res =  await fetch( API_BASE_URL+ `${tabletype}/${userId}`, requestOptions);
    if (res.ok){
        return true;
    }else{
        return false;
    }
}
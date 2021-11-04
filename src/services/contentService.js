import {API_BASE_URL} from '../config/appConfig';


export const getTableColums = async (tableName) => {
    const requestOptions = {
        method: "GET"
    }

    try{
        const res =await fetch( API_BASE_URL+ `${tableName}/meta`, requestOptions)
        if (res.ok){
            return await res.json();
        }else{
            return false;
        }
    }catch(err){
        console.error(err);
        return [];
    }
}

export const allUsers = async (tabletype) => {

    const requestOptions = {
        method: "GET"
    }

    try{
        const res =await fetch( API_BASE_URL+ `${tabletype}`, requestOptions)
        if (res.ok){
            return await res.json();
        }else{
            return false;
        }
    }catch(err){
        console.error(err); return [];
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

    try{
        const res = await fetch( API_BASE_URL+`${tabletype}`, requestOptions)
        if (res.ok){
            return await res.json();
        }else{
            return false;
        }
    }catch(err){
        console.error(err);
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

    try{
        const res = await fetch( API_BASE_URL+ `${tabletype}/${userId}`, requestOptions)
        if (res.ok){
            return await res.json();
        }else{
            return false;
        }
    }catch(err){
        console.error(err);
        return false;
    }
}

export const deleteUser = async (tabletype,userId) => {

    const requestOptions = {
        method: "DELETE"
    }

    try{
        const res =  await fetch( API_BASE_URL+ `${tabletype}/${userId}`, requestOptions)
        if (res.ok){
            return true;
        }else{
            return false;
        }
    }catch(err){
        console.error(err);
        return false;
    }
    
}
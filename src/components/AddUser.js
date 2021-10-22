import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Popup from './basic/Popup';
import {addNewUser, allUsers} from '../services/userService';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles( theme => ({
    form:{
        display:"flex",
        flexDirection:"column"
    },

    inputs:{
        marginTop:10,
    }

}));


export default function AddUser(props) {

    const initial_val = {
        name:"",
        age: 0
    }

    const classes = useStyles();
    const [values, setValues] = useState(initial_val);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const handleClose = () => {
        setOpen(false);
    }

    const test_function = async () => {
        const res = await allUsers({
            name: "frontend1",
            age: 25
        });
        if(res){
            setOpen(false);
            setError("");
            setValues(initial_val);
        }
        else{
            setError("User creation failed.");
        }
    }

    useEffect(() => {
        test_function();
    })

    const handleAddUser = async () => {
        const res = await addNewUser(values);
        if(res){
            setOpen(false);
            setError("");
            setValues(initial_val);
        }
        else{
            setError("User creation failed.");
        }
    }

    const handleAge = (e) => {
        if( e.target.value === ""){
            setValues({...values, age: 0});
        }
        else if( !isNaN(e.target.value)){
            setValues({...values, age: parseInt(e.target.value)});
        }
    }

    const actions = (
        <>
            <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddUser} color="primary">Add</Button>
        </>
    )

    return (
        <div>
            <Popup title="Add New User" actions={actions} open={open} setOpen={setOpen}>
                {error !== "" && (
                    <Typography variant="caption">
                        {error}
                    </Typography>
                )}
                
                <form className={classes.form}>
                    <TextField className={classes.inputs} value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} label="Name" variant="outlined" />
                    <TextField className={classes.inputs} value={values.age} onChange={handleAge} label="age" variant="outlined" />
                </form>
            </Popup>

            <Button  onClick={() => setOpen(true)} variant="contained" color="primary" endIcon={<AddIcon />}>
                Add User
            </Button>
        </div>
    )
}

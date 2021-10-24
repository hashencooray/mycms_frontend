import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Popup from './basic/Popup';

const useStyles = makeStyles( theme => ({
    form:{
        display:"flex",
        flexDirection:"column"
    },

    inputs:{
        marginTop:10,
    }

}));


export default function EditUser(props) {

    const initial_val = {
        name:"",
        age: 0
    }

    const classes = useStyles();
    const [values, setValues] = useState(initial_val);
    const [error, setError] = useState("");
    const {open, setOpen, handleEditUser} = props;

    const handleClose = () => {
        setOpen(false);
    }

    const handleEdit = async () => {
        const res = await handleEditUser(values);
        if(res){
            setOpen(false);
            setError("");
            setValues(initial_val);
        }
        else{
            setError("User update failed.");
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
            <Button variant="contained" onClick={handleEdit} color="primary">Save</Button>
        </>
    )

    return (
        <div>
            <Popup title="Update User" actions={actions} open={open} setOpen={setOpen}>
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
        </div>
    )
}

import { Button,  makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Popup from './basic/Popup';
import {deleteUser} from '../services/userService';

const useStyles = makeStyles( theme => ({
    form:{
        display:"flex",
        flexDirection:"column"
    },

    inputs:{
        marginTop:10,
    }

}));


export default function DeleteUser(props) {

    const classes = useStyles();
    const [error, setError] = useState("");
    const {userId, open, setOpen} = props;

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteUser = async () => {
        const res = await deleteUser(userId);
        if(res){
            setOpen(false);
            setError("");
        }
        else{
            setError("User deletion failed.");
        }
    }

    const actions = (
        <>
            <Button variant="contained"  onClick={handleClose} color="primary">Cancel</Button>
            <Button variant="contained" color="secondary" onClick={handleDeleteUser}>Delete</Button>
        </>
    )

    return (
        <div>
            <Popup title="Delete User" actions={actions} open={open} setOpen={setOpen}>
                {error !== "" && (
                    <Typography variant="caption">
                        {error}
                    </Typography>
                )}
                <form className={classes.form}>
                    Are you sure?
                </form>
            </Popup>
        </div>
    )
}

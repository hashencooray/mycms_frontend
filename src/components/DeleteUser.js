import { Button,  Grid,  makeStyles, Typography } from '@material-ui/core';
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


export default function DeleteUser(props) {

    const classes = useStyles();
    const [error, setError] = useState("");
    const {open, setOpen, handleDeleteUser} = props;

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = async () => {
        const res = await handleDeleteUser();
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
            <Button variant="contained" color="secondary" onClick={handleDelete}>Delete</Button>
        </>
    )

    return (
        <div>
            <Popup title="Delete User" actions={actions} open={open} setOpen={setOpen}>
                {error !== "" && (
                    <Grid container>
                        <Typography style={{width:"100%", textAlign:"center", marginBottom:10, padding:10, background: "#ff9999", color: "red"}} variant="caption">
                            {error}
                        </Typography>
                    </Grid>
                )}
                <form className={classes.form}>
                    Are you sure?
                </form>
            </Popup>
        </div>
    )
}

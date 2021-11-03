import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
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
       
    }

    const classes = useStyles();
    
    const [error, setError] = useState("");
    const {open, setOpen, handleEditUser,tabletype,columnnames, content} = props;

    useEffect( () => {
        if(columnnames) {
            columnnames.forEach(column => {
                if(column !== "id"){
                 initial_val[column] = content[column]
                }
            });
            setInitialValues();
        }
       }, [columnnames, content])

    const [values, setValues] = useState(initial_val);

    const setInitialValues = () => {
        setValues(initial_val);
    }
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
    const handleonchange = (e,column) => {
        values[column] = e.target.value
        setValues({...values});
    }

    const actions = (
        <>
            <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleEdit} color="primary">Save</Button>
        </>
    )

    return (
        <div>
            <Popup title={"Add "+tabletype} actions={actions} open={open} setOpen={setOpen}>
                {error !== "" && (
                    <Typography variant="caption">
                        {error}
                    </Typography>
                )}
               <form className={classes.form}>
                    {
                columnnames.length !== 0 ? columnnames.map( (column, index) => 
                  (
                    column !== "id" ? 
                       (<TextField className={classes.inputs} value={values[column]} onChange={(e) => handleonchange(e,column)} label={column} variant="outlined" />) 
        
                       :null
               
                    
                      
                  )
                ):(
                  <div> no coloumn found</div>
                )
              }
                </form>
            </Popup>
        </div>
    )
}

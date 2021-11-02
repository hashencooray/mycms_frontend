import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState,useEffect } from 'react';
import Popup from './basic/Popup';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles( theme => ({
    
    form:{
        display:"flex",
        flexDirection:"column",
        '& > *': {
            margin: theme.spacing(1),
        }
    }

}));


export default function AddUser(props) {

    const initial_val = {
        
            
    }



    const classes = useStyles();
    
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const {handleAddUser,tabletype,columnnames} = props;

    useEffect( () => {
       if(columnnames) {
           columnnames.forEach(column => {
               if(column !== "id"){
                initial_val[column] = column

               }
              
           });
       }
      }, [columnnames])

      const [values, setValues] = useState(initial_val);

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddNewUser = async () => {
        const res =await handleAddUser(values);
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

    const handleonchange = (e,column) => {
        const temp = values;
        temp[column] = e.target.value

        setValues(temp);
    }

    const actions = (
        <>
            <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddNewUser} color="primary">Add</Button>
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

            <Button  onClick={() => setOpen(true)} variant="contained" color="primary" endIcon={<AddIcon />}>
              Add {tabletype}
            </Button>
        </div>
    )
}

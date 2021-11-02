import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import AddUser from './AddUser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditUser from "./EditUser";
import DeleteUser from './DeleteUser';
import { addNewUser, deleteUser, editUser } from "../services/userService";
import { allUsers } from "../services/generalService";
import { Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default function UsersTable() {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(0);
  const [columnnames, setColumnnames] = useState([]);


  let { tabletype } = useParams();
  const getAllUsers = async () => {
    const res = await allUsers(tabletype);
    if(res){
      getFields(res);
      console.log(res)
      setUsers(res);
      setError("");
    }else{
      setError("Get users failed.");
    }
  }
const getFields = (res) => {
 if(res.length > 0){
   const res1=res[0];
   const columnnames = Object.keys(res1);
   console.log(columnnames);
   setColumnnames(columnnames);
 }

}


  useEffect( () => {
    getAllUsers(); 
  }, [])

  const handleEditPopup = (userId) => {
    setUserId(userId);
    setOpenEdit(true);
  }

  const handleDeletePopup = (userId) => {
    setUserId(userId);
    setOpenDelete(true);
  }

  //  add new user to DB
  const handleAddUser = async (values) => {
    console.log(values)
    const res = await addNewUser(tabletype,values);
    if(res){
      setUserId(0);
      await getAllUsers();
    }
    return res;
}

// delete user from DB
const handleDeleteUser = async () => {
  const res = await deleteUser(tabletype,userId);
  return res;
}

// edit user in DB
const handleEditUser = async (data) => {
  const res = await editUser(tabletype,userId, data);
  if(res){
    setUserId(0);
  }
  return res;
}

  return (
    <div>
      <EditUser open={openEdit} setOpen={setOpenEdit} handleEditUser={handleEditUser} tabletype={tabletype} columnnames={columnnames} />
      <DeleteUser open={openDelete} setOpen={setOpenDelete} handleDeleteUser={handleDeleteUser} />
      <div>
        <h1> {tabletype} Table</h1>
        { error !== "" && (
          <Typography variant="subtitle1">
            {error}
          </Typography>
        )}
        <div style={{width: "90%",marginBottom:"10px", display:"flex", justifyContent:"flex-end"}}>
          <AddUser  handleAddUser={handleAddUser} tabletype={tabletype} columnnames={columnnames} />
        </div>
        <div>
          <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
            {
                columnnames.length !== 0 ? columnnames.map( (column, index) => 
                  (
                    
                      <td>{column}</td>
                      
                      
                  )
                ):(
                  <tr style={{background:"#ffaaaa"}}>
                    <td style={{color:"red"}} colSpan={4}> No Data.</td>
                  </tr>
                )
              }
              <td>actions</td>
              </tr>
            </thead>
            <tbody>
              {
                users.length !== 0 ? users.map( (user, index) => 
                  (
                    <tr key={index}>
                      {
                columnnames.length !== 0 ? columnnames.map( (column, index) => 
                  (
                    
                      <td>{user[column]}</td>
                      
                      
                  )
                ):(
                  null
                )
              }
                      
                      <td style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <Button onClick={() => handleEditPopup(user.id)} style={{marginRight:16, border:"none"}}> <EditIcon color="primary" style={{fontSize:"24px"}} /> </Button>
                        <Button onClick={() => handleDeletePopup(user.id)} style={{ border:"none"}}> <DeleteForeverIcon color="secondary" style={{fontSize:"24px"}} /> </Button>
                      </td>
                    </tr>    
                  )
                ):(
                  <tr style={{background:"#ffaaaa"}}>
                    <td style={{color:"red"}} colSpan={4}> Users not found.</td>
                  </tr>
                )
              }
            </tbody>
          </ReactBootstrap.Table>
        </div>
      </div>
    </div>
  );
}

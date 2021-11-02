import Button from "@restart/ui/esm/Button";
import React, { useEffect, useRef, useState } from "react";
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
  useParams
} from "react-router-dom";
import { createConnnection } from "../services/wsService";
import MsgSnackBar from "./basic/MsgSnackbar";

export default function UsersTable() {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({});
  const [columnnames, setColumnnames] = useState([]);

  const socket = useRef();
  const [snackPack, setSnackPack] = useState([]);

  useEffect( () => {
      socket.current = createConnnection();
      getMessages();
  },[]);

  const getMessages = async () => {
      socket.current.onmessage = (event) => {
          setSnackPack( (prev) => [...prev, { message: event.data, key: new Date().getTime() }])
      }
  }

  let { tabletype } = useParams();
  const getAllUsers = async () => {
    const res = await allUsers(tabletype);
    if(res){
      getFields(res);
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

   setColumnnames(columnnames);
 }else{
  setColumnnames([]);
 }
 

}

  useEffect( () => {
    getAllUsers(); 
  }, [tabletype])

  const handleEditPopup = (user) => {
    setUserId(user.id);
    setUser(user);
    setOpenEdit(true);
  }

  const handleDeletePopup = (user) => {
    setUserId(user.id);
    setUser(user);
    setOpenDelete(true);
  }

  //  add new user to DB
  const handleAddUser = async (values) => {
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
  if(res){
    setUserId(0);
    setUser({});
    await getAllUsers();
  }
  return res;
}

// edit user in DB
const handleEditUser = async (data) => {
  const res = await editUser(tabletype,userId, data);
  if(res){
    setUserId(0);
    setUser({});
    await getAllUsers();
  }
  return res;
}


  return (
    <div>
      <MsgSnackBar snackPack={snackPack} setSnackPack={setSnackPack} />
      <EditUser open={openEdit} content={user} setOpen={setOpenEdit} handleEditUser={handleEditUser} tabletype={tabletype} columnnames={columnnames} />
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
                    
                      <td key={index}>{column}</td>
                      
                      
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
                        <Button onClick={() => handleEditPopup(user)} style={{marginRight:16, border:"none"}}> <EditIcon color="primary" style={{fontSize:"24px"}} /> </Button>
                        <Button onClick={() => handleDeletePopup(user)} style={{ border:"none"}}> <DeleteForeverIcon color="secondary" style={{fontSize:"24px"}} /> </Button>
                      </td>
                    </tr>    
                  )
                ):(
                  <tr style={{background:"#ffaaaa"}}>
                    <td style={{color:"red"}} colSpan={4}> {tabletype} not found.</td>
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

import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import AddUser from './AddUser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditUser from "./EditUser";
import DeleteUser from './DeleteUser';
import { addNewUser, allUsers, deleteUser, editUser } from "../services/userService";
import { Typography } from "@material-ui/core";

export default function UsersTable() {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(0);


  const getAllUsers = async () => {
    const res = await allUsers();
    if(res){
      console.log(res)
      setUsers(res);
      setError("");
    }else{
      setError("Get users failed.");
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
    const res = await addNewUser(values);
    if(res){
      setUserId(0);
      await getAllUsers();
    }
    return res;
}

// delete user from DB
const handleDeleteUser = async () => {
  const res = await deleteUser(userId);
  return res;
}

// edit user in DB
const handleEditUser = async (data) => {
  const res = await editUser(userId, data);
  if(res){
    setUserId(0);
  }
  return res;
}

  return (
    <div>
      <EditUser open={openEdit} setOpen={setOpenEdit} handleEditUser={handleEditUser} />
      <DeleteUser open={openDelete} setOpen={setOpenDelete} handleDeleteUser={handleDeleteUser} />
      <div>
        <h1>Users Table</h1>
        { error !== "" && (
          <Typography variant="subtitle1">
            {error}
          </Typography>
        )}
        <div style={{width: "90%",marginBottom:"10px", display:"flex", justifyContent:"flex-end"}}>
          <AddUser handleAddUser={handleAddUser} />
        </div>
        <div>
          <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.length !== 0 ? users.map( (user, index) => 
                  (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
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

import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import * as ReactBootstrap from "react-bootstrap";
import AddUser from './AddUser';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditUser from "./EditUser";
import DeleteUser from './DeleteUser';

export default function UsersTable() {

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEdit = (userId) => {
    setOpenEdit(true);
  }

  const handleDelete = (userId) => {
    setOpenDelete(true);
  }

  return (
    <div>
      <EditUser open={openEdit} setOpen={setOpenEdit} />
      <DeleteUser open={openDelete} setOpen={setOpenDelete} />
      <div>
        <h1>Users Table</h1>
        <div style={{width: "90%",marginBottom:"10px", display:"flex", justifyContent:"flex-end"}}>
          <AddUser />
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
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                  <Button onClick={() => handleEdit(1)} style={{marginRight:16, border:"none"}}> <EditIcon color="primary" style={{fontSize:"24px"}} /> </Button>
                  <Button onClick={() => handleDelete(1)} style={{ border:"none"}}> <DeleteForeverIcon color="secondary" style={{fontSize:"24px"}} /> </Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                  <Button onClick={() => handleEdit(2)} style={{marginRight:16, border:"none"}}> <EditIcon color="primary" style={{fontSize:"24px"}} /> </Button>
                  <Button onClick={() => handleDelete(2)} style={{ border:"none"}}> <DeleteForeverIcon color="secondary" style={{fontSize:"24px"}} /> </Button>
                </td>
              </tr>
            </tbody>
          </ReactBootstrap.Table>
        </div>
      </div>
    </div>
  );
}

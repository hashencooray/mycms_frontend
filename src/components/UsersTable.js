import React from "react";
import * as ReactBootstrap from "react-bootstrap";

export default function UsersTable() {
  return (
    <div>
      <div>
        <h1>Users Table</h1>
        <div>
          <ReactBootstrap.Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
            </tbody>
          </ReactBootstrap.Table>
        </div>
      </div>
    </div>
  );
}

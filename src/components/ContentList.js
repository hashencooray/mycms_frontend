import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ContentList() {


    const types = ["users", "books", "cars", "softwares"]

    return (
        <div style={{marginBottom: 50}}>
        {
            types.length !== 0 ? types.map( (c , i) => (
                <Link key={i}  to={`/${c}`} style={{textDecoration:"none", margin:5}} >
                    <Button  color="primary" variant="contained" >
                        {c}
                    </Button>
                </Link>
            )): 
            <Typography>
                Content types not found.
            </Typography>
        }

        </div>
    )
}

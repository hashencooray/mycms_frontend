import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: theme.palette.primary.main
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1
    },
  }));

export default function Footer() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Typography style={{color:"White", padding:10}} variant="subtitle1">
          Test project
        </Typography>
    </div>
    )
}

import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import { notify } from "../redux/actions/actions";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Notification({ notify: { open, message, type } }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(notify({ open: false, type }));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={type}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

function mapState(state) {
  return {
    notify: state.notify,
  };
}
export default connect(mapState)(Notification);

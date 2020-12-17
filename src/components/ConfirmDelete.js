import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { confirmedDeleteToTodo } from "../redux/actions/actions";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(
  ({ color, children, classes, onClose, ...other }) => {
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography color={color} variant="h6">
          {children}
        </Typography>
        {onClose && (
          <IconButton className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </MuiDialogTitle>
    );
  }
);

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ConfirmDelete({ open, setOnDelete, title, id }) {
  const handleClose = () => {
    setOnDelete(false);
  };
  const dispatch = useDispatch();

  function confirmDelete() {
    dispatch(confirmedDeleteToTodo(id, title));
    handleClose();
  }

  return (
    <div>
      <Dialog fullWidth onClose={handleClose} open={open}>
        <DialogTitle color="secondary" onClose={handleClose}>
          {"Are you sure to delete"}
        </DialogTitle>

        <DialogContent dividers>
          <Typography gutterBottom>{title + "?"}</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            style={{ textTransform: "capitalize" }}
            autoFocus
            onClick={confirmDelete}
            color="secondary"
          >
            delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

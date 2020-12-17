import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import { formDialog, postTodo } from "../redux/actions/actions";
import Fab from "@material-ui/core/Fab";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";

function FormDialog({ openDialog }) {
  const [form, setForm] = React.useState({ title: "", description: "" });
  const dispatch = useDispatch();

  function handleChange({ target: { value, name } }) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postTodo(form));
    setForm({ title: "", description: "" });
  }

  function handleClose() {
    setForm({ title: "", description: "" });
    dispatch(formDialog(false));
  }

  return (
    <div>
      <Dialog open={openDialog}>
        <DialogTitle>Add todo dialog form</DialogTitle>

        <DialogContent>
          <DialogContentText>
            To add a todo to this app, please enter your todo title, description
            here. We will remind you occasionally.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              value={form.title}
              onChange={handleChange}
              autoFocus
              margin="normal"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={form.description}
              onChange={handleChange}
              autoFocus
              margin="normal"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />

            <DialogActions>
              <Button onClick={handleClose} color="primary" type="reset">
                Cancel
              </Button>
              <Fab color="primary" size="small" onClick={handleSubmit}>
                <DoneSharpIcon type="submit" color="inherit" />
              </Fab>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default FormDialog;

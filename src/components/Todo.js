import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import AccordionActions from "@material-ui/core/AccordionActions";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect, useDispatch } from "react-redux";
import {
  setCompleted,
  submitButton,
  updateTodo,
} from "../redux/actions/actions";
import SubmitButton from "./SubmitButton";
import Fab from "@material-ui/core/Fab";
import ConfirmDelete from "./ConfirmDelete";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

function Todo({ title, description, id, todo }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState({ ...todo });
  const [todoToEdit, setTodoToEdit] = useState({ ...todo });
  const [onDelete, setOnDelete] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(submitButton({ loading: true, success: false }));
    dispatch(updateTodo(todoToEdit));
    dispatch(submitButton({ loading: false, success: true }));
  }

  function handleChange({ target: { value, name } }) {
    setTodoToEdit({ ...todoToEdit, [name]: value });
  }

  function handleComplete(e) {
    setIsCompleted({
      ...isCompleted,
      completed: e.target.checked,
    });
    dispatch(setCompleted(isCompleted));
  }

  function handleDelete() {
    setOnDelete(true);
  }

  return (
    <div className={classes.root}>
      <ConfirmDelete
        open={onDelete}
        setOnDelete={setOnDelete}
        title={title}
        id={id}
      />
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isCompleted.completed}
                onChange={handleComplete}
                name="completed"
                color="primary"
              />
            }
            label={title}
          />
        </AccordionSummary>

        {description && (
          <Fragment>
            <AccordionDetails>
              <Typography color="textSecondary">{description}</Typography>
            </AccordionDetails>
            <Divider variant="middle" />
          </Fragment>
        )}

        <AccordionDetails>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={handleChange}
              autoFocus
              margin="normal"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={todoToEdit.title}
            />
            <TextField
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
              value={todoToEdit.description}
            />

            <AccordionActions>
              <SubmitButton />
              <Fab color="secondary" type="button" onClick={handleDelete}>
                <DeleteIcon />
              </Fab>
            </AccordionActions>
          </form>
        </AccordionDetails>
        <Divider />
      </Accordion>
    </div>
  );
}
function mapState(state, ownProps) {
  return {
    todo: state.todos.todos.find((todo) => todo.id === ownProps.id),
  };
}

export default connect(mapState)(Todo);

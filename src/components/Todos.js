import React from "react";
import { connect, useDispatch } from "react-redux";
import { loadTodos, notify } from "../redux/actions/actions";
import Todo from "./Todo";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
  },
  root: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(4),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const Todos = ({ loadTodos, todos, error, ...props }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  React.useEffect(() => {
    loadTodos();
  }, [loadTodos]);
  return (
    <div>
      {error ? (
        dispatch(notify({ open: true, message: error, type: "error" }))
      ) : (
        <List className={classes.list}>
          {todos.map((todo) => {
            return (
              <React.Fragment key={todo.id}>
                <Todo {...todo} />
              </React.Fragment>
            );
          })}
        </List>
      )}
      <ScrollTop {...props}>
        <Fab color="primary" size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
  };
};

export default connect(mapStateToProps, { loadTodos })(Todos);

import React from "react";
import Todos from "./components/Todos";
import Header from "./components/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import PrivateRoute from "./api/PrivateRoute";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Loading />
      <PrivateRoute component={<Todos />} />
      {/*<Todos />*/}
      <Footer />
    </React.Fragment>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useTable } from "react-table";
import BasicTable from "./components/BasicTable";
import makeData, { seedDb, columns } from "./makeData";
import Axios from "axios";
import faker from "faker";
import useAxios from "axios-hooks";
import { Container } from "@material-ui/core";
import ReactDataGrid from "react-data-grid";
import BasicGrid from "./components/BasicGrid";
// seedDb();
function App() {
  const [{ data, loading, error }] = useAxios("/api/users");
  return (
    <Container className="App">
      {!loading && <BasicTable columns={columns} data={data} />}
      <BasicGrid />
    </Container>
  );
}

export default App;

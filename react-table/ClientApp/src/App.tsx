import { Container } from "@material-ui/core";
import useAxios from "axios-hooks";
import React from "react";
import BasicGrid from "./components/BasicGrid";
import BasicTable from "./components/BasicTable";
import { columns, seedDb } from "./makeData";

seedDb(52);

function App() {
  const [{ data, loading, error }] = useAxios("/api/users");

  return (
    <Container className="App">
      {!loading && <BasicTable columns={columns} data={data} />}
    </Container>
  );
}

export default App;

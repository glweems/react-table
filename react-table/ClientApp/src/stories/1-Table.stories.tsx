import { Button } from "@storybook/react/demo";
import useAxios from "axios-hooks";
import _ from "lodash";
import React from "react";
import BasicTable from "../components/BasicTable";
import EditableTableForm from "../components/EditableTableForm";
import { columns, seedDb } from "../makeData";

export default {
  title: "Button",
  component: Button,
};

export const OnBlurApiCall = () => {
  seedDb(5);
  const [{ data, loading, error }] = useAxios("/api/users");

  return loading ? null : <BasicTable columns={columns} data={data} />;
};

export const TableForm = () => {
  const yAxis = [
    "Unsecured credit card loans",
    "Payday alternative loans (pal loans)",
    "Non-federal guaranteed student loans",
    "New vehicle loans",
    "Used vehicle loans",
    "Total 1st mtg re loan/loc",
    "Total other re loans/loc",
    "Leans Receivable",
    "All other loans",
  ];

  const columns = [
    { Header: "Y-Axis", accessor: "y" },
    { Header: "Ending Balance", accessor: "endingBalance", editable: true },
    {
      Header: "Esitmated Lifetime Losses",
      accessor: "esitmatedLifetimeLosses",
      editable: true,
    },
  ];

  const data = yAxis.map((y) => {
    let obj = { y };
    columns.forEach((c) => {
      obj[_.camelCase(c.Header as string)] = "";
    });
    return obj;
  });

  return <EditableTableForm columns={columns} data={data} />;
};

import { object, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { Column } from "react-table";
import { TableForm } from "../components/TableForm";
import * as Yup from "yup";

type ExampleOneObj = {
  endingBalance: number | "";
  esitmatedLifetimeLosses: number | "";
};
// const schema =
storiesOf("TableForm", module)
  .add("default", () => {
    const columns: Column<ExampleOneObj>[] = [
      {
        Header: "Ending Balance",
        accessor: "endingBalance",
      },
      {
        Header: "Esitmated Lifetime Losses",
        accessor: "esitmatedLifetimeLosses",
      },
    ];

    const data = [
      { endingBalance: "", esitmatedLifetimeLosses: "" },
      { endingBalance: "", esitmatedLifetimeLosses: "" },
      { endingBalance: "", esitmatedLifetimeLosses: "" },
      { endingBalance: "", esitmatedLifetimeLosses: "" },
    ];

    const validationSchema = {
      endingBalance: Yup.number().required(),
      esitmatedLifetimeLosses: Yup.number().required(),
      // Rest of your amenities object properties
    };

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
    return (
      <TableForm<ExampleOneObj>
        columns={object("columns", columns)}
        data={object("data", data) as any}
        onSubmit={action("submission")}
        validateOnChange={false}
        validateOnMount
        validationSchema={validationSchema}
        yAxis={yAxis}
      />
    );
  })
  .addDecorator(withKnobs);

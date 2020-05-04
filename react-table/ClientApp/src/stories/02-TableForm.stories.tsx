import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
  Toolbar,
  Button,
} from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import _ from "lodash";
import React, { Fragment } from "react";
import { Column, TableOptions, useTable, UseTableOptions } from "react-table";
import { DumpInstance } from "../components/DumpInstance";
import { useFormik } from "formik";
import yup from "yup";

interface Props<T extends object = {}> extends UseTableOptions<T> {
  schema?: yup.ObjectSchema<T>;
}
// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  editable,
  cell,
  ...props
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = (e) => {
    // e.preventDefault();
    setValue(e.target.value);
    props.setFieldValue(props.name, value);
  };
  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!editable) {
    return `${initialValue}`;
  }

  return (
    <Input
      id={props.name}
      name={props.name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={true}
    />
  );
};

export function TableForm<T extends object = { debug?: boolean }>({
  columns: rawColumns,
  data: rawData,
  schema,
}: Props<T>) {
  const {
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
    setFieldValue,
    ...formik
  } = useFormik({
    initialValues: rawData,
    onSubmit: () => console.log("submit"),
  });
  const columns = React.useMemo(() => rawColumns, []);

  const data = React.useMemo(() => formik.values, []);

  const defaultColumn = React.useMemo(
    () => ({
      Cell: EditableCell,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>({ columns, data, defaultColumn });

  return (
    <Fragment>
      <TableContainer>
        <form onSubmit={handleSubmit}>
          <Table {...getTableProps}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      console.log("cell: ", cell);
                      let name = `[${cell.row.index}].${cell.column.id}`;
                      console.log("name: ", name);
                      console.log("cell.getCellProps(): ", cell.getCellProps());
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell", {
                            name,
                            editable: true,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                          })}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Toolbar>
            <Button type="submit">Submit</Button>
          </Toolbar>
        </form>
      </TableContainer>

      <DumpInstance instance={{ defaultColumn, values: formik.values }} />
    </Fragment>
  );
}

type ExampleOneObj = {
  endingBalance: number;
  esitmatedLifetimeLosses: number;
};

storiesOf("TableForm", module).add("default", () => {
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

  const formik = useFormik({
    initialValues: [
      { endingBalance: 0, esitmatedLifetimeLosses: 0 },
      { endingBalance: 0, esitmatedLifetimeLosses: 0 },
      { endingBalance: 0, esitmatedLifetimeLosses: 0 },
      { endingBalance: 0, esitmatedLifetimeLosses: 0 },
    ],
    onSubmit: () => console.log("submit"),
  });

  return <TableForm<ExampleOneObj> columns={columns} data={formik.values} />;
});

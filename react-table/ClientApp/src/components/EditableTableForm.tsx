/* eslint-disable react/prop-types */
import {
  Box,
  Input,
  InputBaseProps,
  Table,
  TableBody,
  TableCell,
  TableCellProps as MuiTableCellProps,
  TableHead as MuiTableHead,
  TableRow,
  TableHeadProps as MuiTableHeadProps,
} from "@material-ui/core";

import { useFormik } from "formik";
import React, { Fragment } from "react";
import { Cell, Row, useTable } from "react-table";
import shortid from "shortid";
import { DumpInstance } from "./DumpInstance";
import Axios from "axios";
import { User } from "../../../Models/user";

function TableHeader(props: MuiTableHeadProps) {
  console.log("props: ", props);
  return <MuiTableHead {...props} />;
}
function EditableTableForm<T = {}>({
  columns: rawColumns,
  data: rawData,
}: any) {
  const columns = React.useMemo(() => rawColumns, []);
  const data = React.useMemo(() => rawData, []);

  const defaultColumn = React.useMemo(
    () => ({
      Cell: EditableCell,
      Header: TableHeader,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<{ columns: User[] }>({
    columns,
    data,
    defaultColumn,
  });

  return (
    <Fragment>
      <Box maxHeight={200} position="relative">
        <Table {...getTableProps()}>
          <MuiTableHead>
            {headerGroups.map((headerGroup) => {
              return (
                <TableRow
                  key={shortid()}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => {
                    console.log("column: ", column);
                    return (
                      <TableCell
                        key={shortid()}
                        variant="head"
                        {...column.getHeaderProps()}
                        scope="row"
                      >
                        {column.render("Header", { stickyHeader: true })}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </MuiTableHead>
          <TableBody {...getTableBodyProps()}>
            {rows
              .filter((r) => {
                console.log("r: ", r);
                return r;
              })
              .map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow key={shortid()} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return cell.render("Cell", {
                        key: shortid(),
                        ...cell.getCellProps(),
                      });
                    })}
                  </TableRow>
                );
              })}
          </TableBody>

          {}
        </Table>
        <Box width="100%">
          <DumpInstance
            enabled
            instance={{
              data,
              columns,
            }}
          />
        </Box>
      </Box>
    </Fragment>
  );
}

const EditableCell = ({
  value: initialValue,
  row,
  column,
  updateData, // This is a custom function that we supplied to our table instance
  editable,
  ...props
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);
  console.log("props: ", props);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const handleBlur = () => {
    updateData(column, row, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!row.values.editable) {
    return <TableCell>{value}</TableCell>;
  }

  return (
    <TableCell>
      <Input
        defaultValue={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={"hi"}
      />
    </TableCell>
  );
};

type EditableTableCellProps = MuiTableCellProps &
  InputBaseProps & { cell: Cell<{}, any>; row: Row; value: any };

export default EditableTableForm;

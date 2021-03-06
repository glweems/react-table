/* eslint-disable react/prop-types */
import {
  Box,
  Input,
  InputBaseProps,
  Table,
  TableBody,
  TableCell,
  TableCellProps as MuiTableCellProps,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { Cell, Row, useTable } from "react-table";
import shortid from "shortid";
import { DumpInstance } from "./DumpInstance";
import Axios from "axios";

function BasicTable({ columns: rawColumns, data: rawData }: any) {
  const columns = React.useMemo(() => rawColumns, []);
  const data = React.useMemo(() => rawData, []);

  const defaultColumn = React.useMemo(
    () => ({
      Cell: EditableCell,
      Header: TableHead,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    defaultColumn,
  });

  async function updateData(column, row, value) {
    await Axios.put(`/api/users/${row.original.id}`, {
      ...row.values,
      id: row.original.id,
      [column.id]: value,
    });
  }

  return (
    <Fragment>
      <Box maxHeight={200} position="relative">
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => {
              return (
                <TableRow
                  key={shortid()}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      key={shortid()}
                      variant="head"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header", { stickyHeader: true })}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow key={shortid()} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return cell.render("Cell", {
                      key: shortid(),
                      editable: true,
                      updateData,
                    });
                  })}
                </TableRow>
              );
            })}
          </TableBody>
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
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

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

  if (!editable) {
    return `${initialValue}`;
  }

  return (
    <TableCell>
      <Input value={value} onChange={handleChange} onBlur={handleBlur} />
    </TableCell>
  );
};

type EditableTableCellProps = MuiTableCellProps &
  InputBaseProps & { cell: Cell<{}, any>; row: Row; value: any };

export default BasicTable;

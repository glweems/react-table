/* eslint-disable react/prop-types */
import {
  Table,
  TableBody,
  TableCell,
  TableCellProps as MuiTableCellProps,
  TableHead,
  TableRow,
  InputBase,
  Box,
  InputBaseProps,
  Input,
} from "@material-ui/core";
import React, { FC, Fragment } from "react";
import {
  TableProps as ReactTableProps,
  useTable,
  CellProps,
  Cell,
  Row,
} from "react-table";
import shortid from "shortid";
import { useFormik } from "formik";
import { DumpInstance } from "./DumpInstance";
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

  const formik = useFormik({
    initialValues: { data },
    onSubmit: (values) => {},
  });

  function updateData(column, row, value) {
    console.debug("id", row.original.id);
    console.debug("object key", column.Header);
    console.debug(
      "value",
      column.Header,
      "id",
      row.original.id,
      "value",
      value
    );
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
              console.log("row: ", row);
              prepareRow(row);
              return (
                <TableRow key={shortid()} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    /*    return (
                      <EditableTableCell
                        key={shortid()}
                        row={row}
                        cell={cell}
                        onChange={formik.handleChange}
                        value={
                          formik.values.data[cell.column.index][cell.column.id]
                        }
                      />
                    ); */

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
              form: formik.values,
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

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
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
      <Input
        id={`[${row.index}][${column.id}]`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </TableCell>
  );
};

type EditableTableCellProps = MuiTableCellProps &
  InputBaseProps & { cell: Cell<{}, any>; row: Row; value: any };

const EditableTableCell: FC<EditableTableCellProps> = ({
  cell,
  value,
  onChange,
  ...props
}) => {
  console.log("cell: ", cell);
  return (
    <TableCell {...props}>
      <InputBase
        name={`data[${cell.column.depth}].${cell.column.id}`}
        value={value}
        onChange={onChange}
        fullWidth
      />
    </TableCell>
  );
};

export default BasicTable;

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
import * as Yup from "yup";
import { useFormik, FormikConfig, FormikHelpers } from "formik";

type TableFormProps<T extends {}> = {
  columns: Column<T>[];
  data: T[];
  onSubmit: (values: T) => void | Promise<void>;
  validationSchema?: Record<keyof T, any>;
  validateOnChange?: boolean;
  validateOnMount?: boolean;
  yAxis?: string[];
};

// interface TableFormProps<T extends OtherProps<T>> {}

export function TableForm<T extends Object>({
  columns: rawColumns,
  data: rawData,
  onSubmit,
  validationSchema,
  ...props
}: TableFormProps<T>) {
  const initialValues = React.useMemo(() => rawData, []);

  const {
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
    setFieldValue,
    validateField,
    validateForm,
    ...formik
  } = useFormik({
    initialValues: { data: initialValues },
    onSubmit,
    validationSchema: Yup.object().shape({
      data: Yup.array().of(Yup.object().shape<T>(validationSchema as any)),
    }),
    validateOnChange: props.validateOnChange,
    validateOnMount: props.validateOnMount,
  });

  React.useEffect(() => {
    formik.setFormikState((state) => ({ ...state, valid: false }));
  }, []);

  const columns = React.useMemo(() => rawColumns, []);

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
  } = useTable<T>({
    columns,
    data: formik.values.data,
    defaultColumn,
  });

  return (
    <Fragment>
      <TableContainer>
        <form onSubmit={handleSubmit}>
          <Table {...getTableProps}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {props?.yAxis && props?.yAxis.length > 0 && (
                    <TableCell></TableCell>
                  )}
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <Fragment>
                    <TableRow {...row.getRowProps()}>
                      <TableCell>{props?.yAxis?.[rowIndex]}</TableCell>
                      {row.cells.map((cell) => {
                        let name = `data[${cell.row.index}].${cell.column.id}`;

                        return (
                          <Fragment>
                            <TableCell {...cell.getCellProps()}>
                              {cell.render("Cell", {
                                name,
                                editable: true,
                                handleChange,
                                handleBlur,
                                error:
                                  formik.errors?.data?.[cell.row.index]?.[
                                    cell.column.id
                                  ],
                                touched:
                                  formik.touched?.data?.[cell.row.index]?.[
                                    cell.column.id
                                  ] !== undefined
                                    ? true
                                    : false,
                              })}
                            </TableCell>
                          </Fragment>
                        );
                      })}
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
          <Toolbar>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              disabled={!formik.isValid}
            >
              Submit
            </Button>
          </Toolbar>
        </form>
      </TableContainer>

      <DumpInstance
        instance={{
          defaultColumn,
          values: formik.values,
          errors: formik.errors,

          ...formik,
        }}
      />
    </Fragment>
  );
}
// Create an editable cell renderer
const EditableCell = ({
  name,
  value: initialValue,
  handleChange,
  handleBlur,
  editable,
  cell,
  error,
  ...props
}) => {
  // We need to keep and update the state of the cell normally
  console.log("error: ", error);

  const [value, setValue] = React.useState(initialValue);

  // };
  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!editable) {
    return `${initialValue}`;
  }

  return (
    <Input
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={props.touched && error !== undefined ? true : false}
      placeholder="0"
    />
  );
};

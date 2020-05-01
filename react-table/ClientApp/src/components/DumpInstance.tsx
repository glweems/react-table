import {
  IconButton,
  Tooltip,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import BugReportTwoToneIcon from "@material-ui/icons/BugReportTwoTone";
import React, { Suspense, useState } from "react";
const ReactJson = React.lazy(() => import("react-json-view"));

export const DumpInstance: React.FC<{
  enabled: boolean;
  instance: any;
}> = ({ enabled, instance }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return enabled ? (
    <>
      <Tooltip title={"Debug"}>
        <span>
          <IconButton
            className={classes.button}
            onClick={() => setOpen((old) => !old)}
          >
            <BugReportTwoToneIcon />
          </IconButton>
        </span>
      </Tooltip>
      {open && (
        <>
          <br />
          <br />
          <Suspense fallback={<div>loading...</div>}>
            <div className={classes.root}>
              <ReactJson
                src={{ ...instance }}
                collapsed={1}
                indentWidth={2}
                sortKeys
              />
            </div>
          </Suspense>
        </>
      )}
    </>
  ) : null;
};
const useStyles = makeStyles(
  createStyles({
    root: {
      // position: "fixed",
      bottom: 0,
    },
    button: {
      marginTop: 72,
      marginLeft: 0,
    },
  })
);

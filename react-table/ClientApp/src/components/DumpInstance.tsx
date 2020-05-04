import {
  IconButton,
  Tooltip,
  createStyles,
  makeStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Slider,
  Box,
  Select,
} from "@material-ui/core";
import BugReportTwoToneIcon from "@material-ui/icons/BugReportTwoTone";
import React, { Suspense, useState } from "react";
import { useLocalStorage } from "react-use";
const ReactJson = React.lazy(() => import("react-json-view"));

const themes = [
  "apathy",
  "apathy:inverted",
  "ashes",
  "bespin",
  "brewer",
  "bright:inverted",
  "bright",
  "chalk",
  "codeschool",
  "colors",
  "eighties",
  "embers",
  "flat",
  "google",
  "grayscale",
  "grayscale:inverted",
  "greenscreen",
  "harmonic",
  "hopscotch",
  "isotope",
  "marrakesh",
  "mocha",
  "monokai",
  "ocean",
  "paraiso",
  "pop",
  "railscasts",
  "rjv-default",
  "shapeshifter",
  "shapeshifter:inverted",
  "solarized",
  "summerfruit",
  "summerfruit:inverted",
  "threezerotwofour",
  "tomorrow",
  "tube",
  "twilight",
];

export const DumpInstance: React.FC<{
  enabled?: boolean;
  instance?: any;
  collapsed?: number;
}> = ({ enabled, instance, ...props }) => {
  const [expanded, setExpanded] = useLocalStorage("debugExpanded", false);
  const classes = useStyles();
  const [collapsed, setCollapsed] = useLocalStorage<number>(
    "debugCollapsed",
    props.collapsed
  );

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ExpansionPanel
        expanded={expanded}
        onChange={(e, val) => setExpanded(val)}
        variant="outlined"
      >
        <ExpansionPanelSummary
          expandIcon={<BugReportTwoToneIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Typography className={classes.heading}>Location</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box className={classes.root}>
            <Box width={150}>
              <Slider
                value={collapsed}
                step={1}
                onChange={(e, newVal) => setCollapsed(newVal as number)}
                marks
                min={1}
                max={5}
              />
              <Select />
            </Box>
            <ReactJson
              style={{ padding: "1em", borderRadius: ".5em" }}
              src={{ ...instance }}
              collapsed={collapsed}
              indentWidth={2}
              sortKeys
              theme="monokai"
            />
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Suspense>
  );
};

DumpInstance.defaultProps = { enabled: true, collapsed: 3, instance: {} };

const useStyles = makeStyles((theme) =>
  createStyles({
    root: { width: "100%" },
    reactJson: {
      padding: theme.spacing(5),
      margin: theme.spacing(5),
      borderRadius: "3px",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    button: {},
  })
);

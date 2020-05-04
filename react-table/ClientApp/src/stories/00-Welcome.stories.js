import React from "react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome", module).add("To Storybook", () => (
  <Welcome showApp={linkTo("TableForm")} />
));

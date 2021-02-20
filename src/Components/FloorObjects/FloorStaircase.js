import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream } from "@fortawesome/free-solid-svg-icons";

const FloorStaircase = (props) => (
  <button className="staircase" style={{ gridArea: "s" + props.number }}>
    <FontAwesomeIcon icon={faStream} />
    {props.number}
  </button>
);

export default FloorStaircase;

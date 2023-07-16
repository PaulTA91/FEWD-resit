import React from "react";
import { FaStar } from "react-icons/fa";

export default function Star(props) {
  const { selected, onSelect } = props;

  return <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />;
}

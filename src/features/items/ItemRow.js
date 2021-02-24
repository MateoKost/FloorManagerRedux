import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faChair } from "@fortawesome/free-solid-svg-icons";
import itemIconNames from "./IconNames";
import "../table.css";

export const ItemRow = (props) => {
  const { id, idRoom, itemName, isRepaired } = props.item;
  const icon = itemIconNames.find((item) => item.name === itemName);

  return (
    <tr key={id} style={{ backgroundColor: !isRepaired && "#FFF3DB" }}>
      <td>{id}</td>
      <td>{idRoom}</td>
      <td>{itemName}</td>
      <td>
        {
          <span style={{ color: isRepaired === false ? "red" : "grey" }}>
            {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />}
          </span>
        }
      </td>
      <td>
        <Button
          color="info"
          size="sm"
          className="mr-2"
          onClick={props.onEdit.bind(this, id, idRoom, itemName)}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          color="danger"
          size="sm"
          className="mr-2"
          onClick={props.onDelete.bind(this, {id, idRoom, itemName})}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
};

export default ItemRow;

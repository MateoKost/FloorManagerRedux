import React from "react";
import { UncontrolledAlert } from "reactstrap";

export const AlertPanel = (props) => {
  const { data, entity, type, visibility } = props;

  const pre = (() => {
    switch (type) {
      case "success":
        return "Dodano";
      case "info":
        return "Przeniesiono";
      case "warning":
        return "Usunięto";
      default:
        return "";
    }
  })();

  const alertData = (() => {
    switch (entity) {
      case "item":
        return `${data.itemName}`;
      case "soldier":
        return `${data.rank} ${data.name} ${data.lastName}`;
      default:
        return "";
    }
  })();

  return (
    <div>
      {visibility && (
        <UncontrolledAlert color={type}>
           <span>
                {pre} <b>{alertData}</b> - pokój nr <b>{data.idRoom}</b>
          </span>
        </UncontrolledAlert>
      )}
    </div>
  );
};
export default AlertPanel;

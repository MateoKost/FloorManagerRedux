import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import EditModal from "./EditModal";
// import AddModal from "./AddModal";
import { Table, Button, Navbar } from "reactstrap";
import { NavbarBrand, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPen,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import itemIconNames from "./IconNames";
//import { getItems } from "../../../redux/actions";

import { selectAllItems, getItems2 } from "./itemsSlice";

export const ItemTable = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  const itemStatus = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);

  useEffect(() => {
    if (itemStatus === "idle") dispatch(getItems2());
  }, [itemStatus, dispatch]);

  const renderRow = ({ id, idRoom, itemName, isRepaired }) => (
    <tr key={id} style={{ backgroundColor: !isRepaired && "#FFF3DB" }}>
      <td>{id}</td>
      <td>{idRoom}</td>
      <td>{itemName}</td>
      <td>
        {itemIconNames.find((item) => item.name === itemName) ? (
          itemIconNames.find((item) => item.name === itemName).faIcon
        ) : (
          <FontAwesomeIcon icon={faChair} />
        )}
      </td>
      <td>{isRepaired ? "1" : "0"}</td>
      <td>
        <Button
          color="success"
          size="sm"
          className="mr-2"
          // onClick={this.setEditItemData.bind(this, id, idRoom, itemName)}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          color="danger"
          size="sm"
          // onClick={this.deleteItem.bind(this, id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );

  let content;
  if (itemStatus === "pending") {
    content = <div className="loader">Loading...</div>;
  } else if (itemStatus === "fulfilled") {
    console.log(items);
    content =
      items.length > 0 ? 
        items.map(renderRow)
       : 
        <div className="loader">Loading...</div>
      ;
  } else if (itemStatus === "failed") {
    content = <div>{error}</div>;
  }

  //const postStatus = this.useSelector((state) => state.posts.status)
  //const error = this.useSelector((state) => state.posts.error)
  //  const {items, selectedRoomData, selectedRoomId} = this.state;
  return (
    <div className="col-lg-6">
      {/* <AddModal
          onEnter={this.addItem}
          onCancel={this.toggleNewItemModal}
          newItemModal={this.state.newItemModal}
        />
        <EditModal
          onEnter={this.editItem}
          editItemData={this.state.editItemData}
          editItemModal={this.state.editItemModal}
          onCancel={this.toggleEditItemModal}
        />

        <Navbar className="navbar-dark bg-dark" expand="md">
          <NavbarBrand>Lista wyposażenia</NavbarBrand>
          <Nav className="mr-auto" navbar></Nav>
          <Button color="info" onClick={this.toggleNewItemModal}>
            <FontAwesomeIcon icon={faPlus} /> Dodaj
          </Button>
        </Navbar> */}

      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Pokój</th>
            <th>Nazwa</th> 
            <th>Ikona</th>
            <th>Stan</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {content}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemTable;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Navbar } from "reactstrap";
import { NavbarBrand, Nav } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import ItemRow from "./ItemRow";

import { selectAllItems, selectItemsByRoomId, getItems, deleteItem } from "./itemsSlice";

export const ItemTable = (props) => {
  const dispatch = useDispatch();
  // const items = useSelector(selectAllItems);
  const items = useSelector( props.roomId ==="" ? selectAllItems : (state) => selectItemsByRoomId(state, props.roomId) );
  // const items = useSelector( selectAllItems );
  const itemStatus = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [newItemModal, setNewItemModal] = useState(false);
  const [editItemModal, setEditItemModal] = useState(false);
  const [editItemData, setEditItemData] = useState({});

  useEffect(() => {
    if (itemStatus === "idle") dispatch(getItems());
  }, [itemStatus, dispatch]);

  const canSave = [].every(Boolean) && addRequestStatus === "idle";

  const onDeleteItemClicked = async (data) => {
    if (true) {
      try {
        setAddRequestStatus("pending");
        const resultAction = await dispatch(deleteItem(data.id));
        props.enterAlertData(data, "item", "warning");
        await dispatch(getItems());
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const toggleNewItemModal = (value) => {
    setNewItemModal(value);
  };

  const enterNewItem = async (newItemData) => {
    props.enterAlertData(newItemData, "item", "success");
    await dispatch(getItems());
    toggleNewItemModal(false);
  };

  const enterEditItem = async (data) => {
    props.enterAlertData(data, "item", "info");
    await dispatch(getItems());
    toggleEditItemModal(false);
  };

  const editModalTriggered = (id, idRoom, itemName) => {
    toggleEditItemModal(true);
    setEditItemData({
      id: id,
      idRoom: idRoom,
      itemName: itemName,
    });
  };

  const toggleEditItemModal = (value) => {
    setEditItemModal(value);
  };

  let content;
  if (itemStatus === "pending") {
    content = <div className="loader">Loading...</div>;
  } else if (itemStatus === "fulfilled") {
    console.log(items);
    content =
      items.length > 0 ? (
        items.map((item) => (
          <ItemRow
            item={item}
            onEdit={editModalTriggered}
            onDelete={onDeleteItemClicked}
          />
        ))
      ) : (
        <div className="loader">Loading...</div>
      );
  } else if (itemStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="col-lg-6">
      <AddModal
        onEnter={enterNewItem}
        onCancel={toggleNewItemModal}
        newItemModal={newItemModal}
      />

      <EditModal
        onEnter={enterEditItem}
        editItemData={editItemData}
        editItemModal={editItemModal}
        onCancel={toggleEditItemModal}
      />

      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavbarBrand>Lista wyposażenia</NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>
        <Button
          color="info"
          onClick={() => {
            if (newItemModal === false) setNewItemModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Dodaj
        </Button>
      </Navbar>

      <Table striped >
        <thead>
          idroom{props.roomId}
          <tr>
            <th>#</th>
            <th>Pokój</th>
            <th>Nazwa</th>
            <th>Stan</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
};

export default ItemTable;

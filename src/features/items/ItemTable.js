import React, { useEffect, useState } from "react";
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
  faLessThanEqual,
} from "@fortawesome/free-solid-svg-icons";

import AddModal from "./AddModal";
import EditModal from "./EditModal";
import itemIconNames from "./IconNames";
//import { getItems } from "../../../redux/actions";

import { selectAllItems, getItems, deleteItem } from "./itemsSlice";

export const ItemTable = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  const itemStatus = useSelector((state) => state.items.status);
  const error = useSelector((state) => state.items.error);

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [newItemModal, setNewItemModal] = useState(false)
  const [editItemModal, setEditItemModal] = useState(false)
  const [editItemData, setEditItemData] = useState({})

  useEffect(() => {
    if (itemStatus === "idle") dispatch(getItems());
  }, [itemStatus, dispatch]);

  const canSave =
      [].every(Boolean) && addRequestStatus === 'idle'


  const onDeleteItemClicked = async (id) => {
    if (true) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          deleteItem(id)
        )
        await dispatch(getItems())
        // unwrapResult(resultAction)
        // setTitle('')
        // setContent('')
        // setUserId('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const toggleNewItemModal = (value) => {
    // console.log('togg1 '+retete);
    // let ke = !retete
    // console.log(ke);
    setNewItemModal(value);
    //console.log('togg2 '+newItemModal);
  }

  const enterNewItem = async() => {
    await dispatch(getItems());
    toggleNewItemModal(false);
    // console.log('togg1 '+retete);
    // let ke = !retete
    // console.log(ke);

    //console.log('togg2 '+newItemModal);
  }

  const enterEditItem = async() => {
    await dispatch(getItems());
    toggleEditItemModal(false);
    // console.log('togg1 '+retete);
    // let ke = !retete
    // console.log(ke);

    //console.log('togg2 '+newItemModal);
  }

  const editModalTriggered = (id, idRoom, itemName) => {
    toggleEditItemModal(true);
    setEditItemData({
        id: id,
        idRoom: idRoom,
        itemName: itemName,
      },
    );
  }

  const toggleEditItemModal = (value) => {
    // console.log('togg1 '+retete);
    // let ke = !retete
    // console.log(ke);
    setEditItemModal( value );
    //console.log('togg2 '+newItemModal);
  }


  // const onAddItemClicked => {
  //   console.log(id);
  //   if (true) {
  //     try {
  //       setAddRequestStatus('pending')
  //       const resultAction = await dispatch(
  //         deleteItem(id)
  //       )
  //       await dispatch(getItems2())
  //       // unwrapResult(resultAction)
  //       // setTitle('')
  //       // setContent('')
  //       // setUserId('')
  //     } catch (err) {
  //       console.error('Failed to save the post: ', err)
  //     } finally {
  //       setAddRequestStatus('idle')
  //     }
  //   }
  // }


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
          onClick={editModalTriggered.bind(this, id, idRoom, itemName)}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={onDeleteItemClicked.bind(this, id)}
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
          <Button color="info" onClick={()=>{if(newItemModal===false) setNewItemModal(true)}}>
            <FontAwesomeIcon icon={faPlus} /> Dodaj
          </Button>
        </Navbar> 

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

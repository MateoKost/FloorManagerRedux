import React, { Component } from "react";
import EditModal from "../Modals/EditModal";
import AddModal from "../Modals/AddModal";

import { Table, Button, Navbar } from "reactstrap";

import {
    NavbarBrand,
    Nav
  } from "reactstrap";
  

  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faPlus,
    faTrash,
    faPen,
  } from "@fortawesome/free-solid-svg-icons";


class SoldierTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        soldiers: [],
        selectedRoomData: {
            roomItems: [],
            roomSoldiers: [],
            roomId: "",
          },
          selectedRoomId: "",
          editSoldierData: {
            idSoldier: "",
            name: "",
            lastName: "",
            rank: "",
            idRoom: "",
          },
          editSoldierModal: false,
          newSoldierModal: false,
      };
      this.toggleEditSoldierModal = this.toggleEditSoldierModal.bind(this);
      this.toggleNewSoldierModal = this.toggleNewSoldierModal.bind(this);
    }
  
    setEditSoldierData(idSoldier, name, lastName, rank, idRoom) {
      this.toggleEditSoldierModal();
  
      this.setState({
        editSoldierData: {
          idSoldier: idSoldier,
          name: name,
          lastName: lastName,
          rank: rank,
          idRoom: idRoom,
        },
      });
    }

    toggleNewSoldierModal() {
      this.setState({
        newSoldierModal: !this.state.newSoldierModal,
      });
    }

    toggleEditSoldierModal() {
      this.setState({
        editSoldierModal: !this.state.editSoldierModal
      });
    }

    renderSoldier = ({ idSoldier, name, lastName, rank, idRoom }) => (
        <tr key={idSoldier}>
          <td>{rank}</td>
          <td>{name}</td>
          <td>{lastName}</td>
          <td>{idRoom}</td>
    
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.setEditSoldierData.bind(
                this,
                idSoldier,
                name,
                lastName,
                rank,
                idRoom
              )}
            >
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button
              color="danger"
              size="sm"
             // onClick={this.deleteItem.bind(this, { idSoldier })}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </td>
        </tr>
      );


    render() {
        const {selectedRoomId, soldiers, selectedRoomData} = this.state;
      return (
        <div>
          <AddModal
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
           <div className="col-lg-6 ">
            <Navbar className="navbar-dark bg-dark" expand="md">
              <NavbarBrand>Lista żołnierzy</NavbarBrand>
              <Nav className="mr-auto" navbar></Nav>
              <Button color="info" onClick={this.toggleNewSoldierModal}>
                <FontAwesomeIcon icon={faPlus} /> Dodaj 
              </Button>

              {/* <NavbarText>Zaloguj</NavbarText> */}
            </Navbar>

            {
              <Table striped>
                <thead>
                  <tr>
                    <th>Stopień</th> <th>Imię</th> <th>Nazwisko</th>{" "}
                    <th>Pokój</th> <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRoomId === ""
                    ? soldiers.map(this.renderSoldier)
                    : selectedRoomData.roomSoldiers.map(this.renderSoldier)}
                </tbody>
              </Table>
            }
          </div>
        </div>
      );
    }
  }

  export default SoldierTable; 
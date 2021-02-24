import React, { Component } from "react";

import {
  Label,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

//import itemIconNames from '../FloorObjects/IconNames';
import { editItem } from "./itemsSlice";
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  editItem: (editItemData) => {dispatch(editItem(editItemData))},
 });

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onEnter: props.onEnter,
      onCancel: props.onCancel,
      editItemData: props.editItemData,
      editItemModal: props.editItemModal,
    };
  }

  enterEditItem = async() => {
    await this.props.editItem(this.state.editItemData)
    await this.state.onEnter(this.state.editItemData);
    // const { editItemData, onEnter } = this.state;
    // onEnter( editItemData );
  }

  toggleEditItemModal = () => {
    // this.setState({
    //   editItemModal: ! this.state.editItemModal
    // });

    this.state.onCancel( ! this.state.editItemModal);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return{
        editItemModal: nextProps.editItemModal,
        editItemData: nextProps.editItemData
    }
  }

  render() {
    const { editItemModal, editItemData } = this.state;
    return (
      <Modal
        isOpen={editItemModal}
        toggle={this.toggleEditItemModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleEditItemModal.bind(this)}>
          Edytuj przedmiot
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="id">Identyfikator</Label>
            <Input
              type="text"
              name="id"
              id="id"
              value={editItemData.id}
              disabled={true}
            />
          </FormGroup>
          <FormGroup>
            <Label for="idRoom">Pomieszczenie</Label>
            <Input
              type="number"
              name="idRoom"
              id="idRoom"
              placeholder="Pomieszczenie"
              value={editItemData.idRoom}
              onChange={(e) => {
                editItemData.idRoom = parseInt(e.target.value);
                this.setState({ editItemData });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="itemName">Nazwa</Label>
            <Input
              type="text"
              name="itemName"
              id="itemName"
              placeholder="Nazwa"
              value={editItemData.itemName}
              disabled={true}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={this.enterEditItem.bind(this)}>
            Zatwierdź
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleEditItemModal.bind(this)}
          >
            Anuluj
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(null, mapDispatchToProps)(EditModal);
// export default EditModal;

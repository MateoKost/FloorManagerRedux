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
import itemIconNames from "./IconNames";
import { addItem } from "./itemsSlice";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => ({
  newItem: (newItemData) => {
    dispatch(addItem(newItemData));
  },
});

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItemModal: props.newItemModal,
      onEnter: props.onEnter,
      onCancel: props.onCancel,
      newItemData: {
        itemName: "",
        idRoom: 0,
      },
    };
  }

  toggleNewItemModal() {
    this.state.onCancel(!this.state.newItemModal);
  }

  enterNewItem = async () => {
    const { newItemData, onEnter } = this.state;
    await this.props.newItem(newItemData);
    await onEnter(newItemData);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      newItemModal: nextProps.newItemModal,
    };
  }

  render() {
    const { newItemModal, newItemData } = this.state;
    return (
      <div>
        <Modal
          isOpen={newItemModal}
          toggle={this.toggleNewItemModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewItemModal.bind(this)}>
            Dodaj nowe wyposażenie
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="idRoom">Pomieszczenie</Label>
              <Input
                type="number"
                name="idRoom"
                id="idRoom"
                placeholder="Pomieszczenie"
                value={newItemData.idRoom}
                onChange={(e) => {
                  newItemData.idRoom = parseInt(e.target.value);
                  this.setState({ newItemData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="itemName">Nazwa</Label>
              <Input
                required
                type="select"
                name="itemName"
                id="itemName"
                placeholder="Nazwa"
                value={newItemData.itemName}
                onChange={(e) => {
                  newItemData.itemName = e.target.value;
                  this.setState({ newItemData });
                }}
              >
                {itemIconNames.map((item, i) => (
                  <option key={i}>{item.name}</option>
                ))}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={this.enterNewItem.bind(this)}>
              Zatwierdź
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewItemModal.bind(this)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddModal);

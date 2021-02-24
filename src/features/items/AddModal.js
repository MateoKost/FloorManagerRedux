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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import itemIconNames from './IconNames';

import { addItem } from "./itemsSlice";
import { connect } from 'react-redux'


const mapDispatchToProps = dispatch => ({
  newItem: (newItemData) => {dispatch(addItem(newItemData))},
 });
 
class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        newItemModal: props.newItemModal, 
        onEnter: props.onEnter,
        onCancel: props.onCancel,
        newItemData: {
            itemName: '',
            idRoom: 0,
          },
    };
  }

  toggleNewItemModal(){
    //console.log('dupaaa');
    this.state.onCancel(!this.state.newItemModal);
  };

  enterNewItem = async() => {
    await this.props.newItem(this.state.newItemData)
    await this.state.onEnter(this.state.newItemData);
  };

  // toggleNewItemModal2(){
  //   console.log('123dupaaa');
  //  // this.setState({newItemModal:value});
  // };


  // shouldComponentUpdate() {
  //   return true;
  // }

  static getDerivedStateFromProps(nextProps, prevState){
    // prevState.setState({
    //           newItemModal: nextProps.newItemModal,
    //       })
    // console.log(nextProps.newItemModal);
    // this.toggleNewItemModal2();
    //prevState.newItemModal=nextProps.newItemModal

  //   console.log(prevState);

  //   if( nextProps.newItemModal !== prevState.newItemModal )
  //   return {
  //     newItemModal:nextProps.newItemModal,
  //     onEnter:prevState.onEnter,
  //     onCancel:prevState.onCancel,
  //     newItemData:prevState.newItemData
  //   }

    // return prevState;
    return{
            newItemModal: nextProps.newItemModal,
        }

  }

  // componentDidUpdate(nextProps, prevState) {

  //   //this.toggleNewItemModal();
  //   console.log("hoho "+nextProps.newItemModal);
  //   console.log("hoho2"+this.state.newItemModal);
  //   console.log("hoho3"+prevState.newItemModal);
  //     // console.log("hoho2"+this.state.newItemModal);
  //   // if( nextProps.newItemModal !== prevState.newItemModal){
  //   //   // console.log("hoho"+nextProps.newItemModal);
  //   //   // console.log("hoho2"+this.state.newItemModal);
  //   //   this.setState({ newItemModal: nextProps.newItemModal  })
  //   //   //console.log(this.state);
  //   // }
  
  //   // this.setState({ newItemModal: nextProps.newItemModal  })

  //   }


  // componentWillReceiveProps(nextProps) {
  //      console.log('dupaaa');
  //   this.setState({
  //       newItemModal: nextProps.newItemModal,
  //   })
  // }

  // addItem(){
  //   const { newItemData, onEnter } = this.state;
  //   onEnter(newItemData);
  // };

  // componentDidUpdate(){

  // }


  componentDidMount() {

  }

  render() {
    const { newItemModal, newItemData } = this.state;
    const {newItem} = this.props
    return (
        <div>

      <Modal isOpen={ newItemModal } toggle={ this.toggleNewItemModal.bind(this) }>
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
// export default ;

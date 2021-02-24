import React, { Component } from "react";
import "../../App.css";
import {Button} from "reactstrap";

import ItemTable from "../../features/items/ItemTable";
// import SoldierTable from "../FloorObjects/SoldierTable";
import AlertPanel from "../FloorObjects/AlertPanel";
import FloorGrid from "../FloorObjects/FloorGrid";

class FloorManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoomId: "",
      alertData:{visibility:false}
    };
    this.setAlertData = this.setAlertData.bind(this);
  }

  selectRoom = (roomId) => {
    this.setState({
      selectedRoomId: roomId,
    });
  };

  setAlertData = (data, entity, type) => {
    console.log(data, entity, type)
    this.setState({
      alertData:{
        data:data,
        entity:entity,
        type:type,
        visibility:true,
      }
    });
  };

  render() {
    const { selectedRoomId, alertData } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-8">
            <h1>11 kompania</h1>
            <FloorGrid selectRoom={this.selectRoom} />
            <AlertPanel {...alertData}/>
          </div>
          <div className="col-lg-2"></div>
        </div>
        <h2>
          {selectedRoomId !== ""
            ? "Wybrano pokój nr " + selectedRoomId
            : "Nie wybrano"}{" "}
        </h2>
        <Button
          color="info"
          onClick={(e) => {
            this.setState({ selectedRoomId: "" });
          }}
        >
          Pokaż ze wszystkich pokoi
        </Button>
        <div className="row  p-4">
          <ItemTable roomId={selectedRoomId} enterAlertData={this.setAlertData}/>
          {/* <SoldierTable roomId={selectedRoomId}/> */}
        </div>
      </div>
    );
  }
}

export default FloorManager;

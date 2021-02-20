import React, { Component } from "react";
import "../../App.css";
// import {Button} from "reactstrap";

import ItemTable from "../../features/items/ItemTable";
// import SoldierTable from "../FloorObjects/SoldierTable";
// import AlertPanel from "../FloorObjects/AlertPanel";
// import FloorGrid from "../FloorObjects/FloorGrid";

class FloorManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  // selectRoom = (roomId) => {
  //   this.setState({
  //     selectedRoomId: roomId,
  //   });
  //   // this.getRoomItems(roomId);
  // };

  render() {
    const { selectedRoomId } = this.state;

    return (
      <ItemTable />
      // <div>
      //   <div className="row">
      //     <div className="col-lg-2"></div>
      //     <div className="col-lg-8">
      //       <h1>11 kompania</h1>
      //       <FloorGrid selectRoom={this.selectRoom} />
      //       <AlertPanel />
      //     </div>
      //     <div className="col-lg-2"></div>
      //   </div>
      //   <h2>
      //     {selectedRoomId !== ""
      //       ? "Wybrano pokój nr " + selectedRoomId
      //       : "Nie wybrano"}{" "}
      //   </h2>
      //   <Button
      //     color="info"
      //     onClick={(e) => {
      //       this.setState({ selectedRoomId: "" });
      //     }}
      //   >
      //     Pokaż ze wszystkich pokoi
      //   </Button>
      //   <div className="row  p-4">
      //     <ItemTable />
      //     <SoldierTable />
      //   </div>
      // </div>
    );
  }
}

export default FloorManager;

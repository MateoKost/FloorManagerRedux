import React, { Component } from "react";
import { Alert } from "reactstrap";


class AlertPanel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        alertVisibility: false,
        alertVisibilityDeleted: false,
        addedData: {
          id: "",
          idRoom: "",
          itemName: "",
        },
      };
    }
  
    toggleSuccessAlerts() {
        this.setState({
          alertVisibility: false,
        });
      }
    
      toggleWarningAlerts() {
        this.setState({
          alertVisibilityDeleted: false,
        });
      }

    onDismiss  = () => this.setState({ alertVisibility: false });
    onDismissDeleted = () => this.setState({ alertVisibilityDeleted: false });
  

    render() {
      const {alertVisibility, addedData, alertVisibilityDeleted} = this.state;
      return (
        <div>
            {alertVisibility && (
              <Alert
                color="success"
                isOpen={alertVisibility}
                toggle={this.toggleSuccessAlerts.bind(this)}
              >
                Dodano <b>{addedData.itemName}</b> do pokoju nr{" "}
                <b>{addedData.idRoom}</b>.
              </Alert>
            )}

            {alertVisibilityDeleted && (
              <Alert
                color="warning"
                isOpen={alertVisibilityDeleted}
                toggle={this.toggleWarningAlerts.bind(this)}
              >
                Usunięto <b>{addedData.itemName}</b> z pokoju nr{" "}
                <b>{addedData.idRoom}</b>.
              </Alert>
            )}
        </div>
      );
    }
  }

  export default AlertPanel;
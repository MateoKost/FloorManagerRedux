import React from "react";
import { Route, Switch } from "react-router-dom";

import "../App.css";
// import Workshop from "./Views/Workshop";
import NMLoggedIn from "./NMLoggedIn";
import FloorManager from "./Views/FloorManager";
// import UserProfile from "./Views/UserProfile";
// import Calendar from "./Views/Calendar";

const LoggedIn= () => ( {

  render() {
    return (
      <div>
        <NMLoggedIn />
        <Switch>
          {/* <Route path="/manage/workshop" component={Workshop} /> */}
          <Route path="/manage/floor" component={FloorManager} />
          {/* <Route path="/manage/profile" component={UserProfile} /> */}
          {/* <Route path="/manage/calendar" component={Calendar} /> */}
        </Switch>
      </div>
    );
  }
})

export default LoggedIn;

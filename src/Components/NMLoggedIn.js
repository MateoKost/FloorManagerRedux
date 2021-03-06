import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import "../App.css";
import { useHistory } from "react-router-dom";
import eszef from "../Assets/Eszef.png";

import GoogleExcel from "./GoogleExcel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHammer,
  faSignOutAlt,
  faTasks,
  faUser,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavMenu = () => {
  const history = useHistory();

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" expand="md">
        <img className="logo" src={eszef} alt={"Eszef"} />
        <NavbarBrand href="/">E-Szef</NavbarBrand>
        <NavbarToggler
        // onClick={toggle}
        />
        <Collapse
          // isOpen={isOpen}
          navbar
        >
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="https://github.com/patryklorbiecki1/Eszef">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>

          <Button
            color="dark"
            style={{ minWidth: "100px" }}
            onClick={(e) => {
              history.push("/manage/calendar");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faCalendarAlt} className="fa-lg" />
            </div>
            <div style={{ marginTop: -4 }}>
              <span style={{ fontSize: 12 }}>Kalendarz</span>
            </div>
          </Button>

          <GoogleExcel />

          <Button
            color="dark"
            style={{ minWidth: "100px" }}
            onClick={(e) => {
              history.push("/manage/floor");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faTasks} className="fa-lg" />
            </div>
            <div style={{ marginTop: -4 }}>
              <span style={{ fontSize: 12 }}>Piętro</span>
            </div>
          </Button>

          <Button
            color="dark"
            style={{ minWidth: "100px" }}
            onClick={(e) => {
              history.push("/manage/workshop");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faHammer} className="fa-lg" />
            </div>
            <div style={{ marginTop: -4 }}>
              <span style={{ fontSize: 12 }}>Warsztat</span>
            </div>
          </Button>

          <Button
            color="dark"
            style={{ minWidth: "100px" }}
            onClick={(e) => {
              history.push("/manage/profile");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faUser} className="fa-lg" />
            </div>
            <div style={{ marginTop: -4 }}>
              <span style={{ fontSize: 12 }}>Profil</span>
            </div>
          </Button>

          <Button
            color="dark"
            style={{ minWidth: "100px" }}
            onClick={(e) => {
              localStorage.removeItem("user"); localStorage.clear();
              history.push("/");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faSignOutAlt} className="fa-lg" />
            </div>
            <div style={{ marginTop: -4 }}>
              <span style={{ fontSize: 12 }}>Wyloguj się</span>
            </div>
          </Button>
          {/* <NavbarText>Zaloguj</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavMenu;

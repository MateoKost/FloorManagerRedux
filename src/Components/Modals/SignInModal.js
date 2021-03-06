import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { React, Component } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import '../../App.css';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'

class SignInModal extends Component {
  constructor(props) {
    super(props);

    

    this.state = {
      loginData:{
        email:null,
        password:null,
      },
      login:false,
      store:null,

      signInModal: props.signInModal,
      onCancel: props.onCancel,


    };
  }



  componentDidMount() {
    this.storeCollector()
  }

  toggleSignInModal() {
    this.state.onCancel();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      signInModal: nextProps.signInModal,
    });
  }


  storeCollector()
  {
    let store = JSON.parse(localStorage.getItem('login'));
   
    if(store && store.login){
      this.setState({login:true,store:store})
    }
  }

  login = async () =>
  {

    let loginParams = {
      "email": this.state.loginData.email,
      "password": this.state.loginData.password
     //  "email": "adam@wp.pl",
      //"password": "123456"
    };
    console.log(loginParams);
    axios.post('https://localhost:5001/login', loginParams) 
      .then((result)=>{
      console.warn("result",result);
      
      localStorage.setItem('login',JSON.stringify({
        login:true,
        store:result.data.token,
        loginData:this.state.loginData
        // email: this.state.loginData.email,
        // password: this.state.loginData.password
      }))




      this.storeCollector()

/*

      if(this.state.store.store){
   
        useHistory().push("/manage");
      }
*/
    })
  }
  get = async () => {

    let token = "Bearer " + this.state.store.store
    console.log(token);
    axios.get('https://localhost:5001/item', {
      headers:{
        'Authorization':token
      }
    }).then((response) => {
      console.log(response.data)
    })
    
  }

  logOut = async () =>{
    localStorage.clear();
  }


  render() {
    const { signInModal, loginData } = this.state;

    return (
      <div>
        {  this.state.store && <Redirect from="/" to="/manage/floor" /> }

        <Modal isOpen={signInModal}>
          <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
            Logowanie
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="login">E-mail</Label>
              <Input
                required
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={loginData.login}
                onChange={(e) => {
                  loginData.email = e.target.value;
                  this.setState({ loginData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Has??o</Label>
              <Input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Has??o"
                value={loginData.password}
                onChange={(e) => {
                  loginData.password = e.target.value;
                  this.setState({ loginData });
                }}
              />
            </FormGroup>
            <Button
              color="success"
              className="btn-lg  btn-block"
              onClick={()=>{this.login()}}
            >
              Zaloguj si??
            </Button>
            {/* <span className="text-center pt-3"> Zaloguj si?? przez </span> */}
            {/* <GoogleLoginButton />
            <FacebookLoginButton /> */}
            <div className="text-center">
              <a href="/sign-up">Zarejestruj si??</a>
              <span className="p=2"> | </span>
              <a href="/forgot-password">Zapomnia??e?? has??a?</a>
            </div>
          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" >Add</Button>{' '} */}
            <Button
              color="secondary"
              onClick={this.toggleSignInModal.bind(this)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </Modal>
        {/* {this.renderRedirect()}  */}
      </div>
    );
  }
}
export default SignInModal;
  
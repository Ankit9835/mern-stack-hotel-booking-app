import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {loginUser} from '../redux/authSlice'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${process.env.REACT_APP_API}/login`, {email,password})
      console.log(response)
      if(response){
          console.log('send data to redux state and localstorage')
          console.log(response.data)
          localStorage.setItem('auth', JSON.stringify(response.data))
          dispatch(loginUser(response.data))
          toast.success(response.data.message)
      }
    } catch(err){
       console.log(err)
       toast.error(err.response.data)
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>Login</h1>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import "./Login.scss";
import tickImage from "../../../Images/tickimage.png";
import { loginUser, registerUser } from "../../../services/https";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate=useNavigate();
  const [register, setRegister] = useState(false);
  const [disablelogin, setDisablelogin] = useState(true);
  const [disableregister, setDisableregister] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [data, setData] = useState({
    userId: "",
    password: "",
  });
  const [rdata, setRdata] = useState({
    UserName: "",
    Password: "",
    ConfirmPassword: "",
  });

  useEffect(() => {
    if (data.userId !== "" && data.password !== "") {
      setDisablelogin(false);
    } else {
      setDisablelogin(true);
    }
  }, [data]);
  useEffect(() => {
    if (
      rdata.UserName !== "" &&
      rdata.Password !== "" &&
      rdata.ConfirmPassword !== ""
    ) {
      if (rdata.Password === rdata.ConfirmPassword) {
        setDisableregister(false);
        setError("");
      } else {
        setError("Both Password are not matching");
      }
    } else {
      setDisableregister(true);
    }
  }, [rdata]);

  const onChange = (e, name) => {
    let newValue = e.target.value;

    // Enforce maximum length of 4 characters
    if (name === "password" && newValue.length > 4) {
      newValue = newValue.slice(0, 4); // Trim the value to 4 characters
    }

    setData((prev) => ({ ...prev, [name]: newValue }));
  };

  const onReisterChange = (e, name) => {
    let newValue = e.target.value;

    // Enforce maximum length of 4 characters
    if (
      (name === "Password" || name === "ConfirmPassword") &&
      newValue.length > 4
    ) {
      newValue = newValue.slice(0, 4); // Trim the value to 4 characters
    }

    setRdata((prev) => ({ ...prev, [name]: newValue }));
  };

  const onRegister = async () => {
    const formData = new FormData();
    formData.append("userName", rdata.UserName);
    formData.append("password", rdata.Password);
    const res = await registerUser(formData);
    if (res === "Username already exists") {
      setError("Username already exists");
    } else if (res.message === "User Register Successfully") {
      setRegister(false);
      setSuccess(true);
    }
  };

  const onLogin=async()=>{
    const formData = new FormData();
    formData.append("userName", data.userId);
    formData.append("password", data.password);
    const res = await loginUser(formData);
    if (res?.data?.userName && res?.data?.userName) {

     localStorage.setItem('userName',res?.data?.userName);
     localStorage.setItem('id',res?.data?._id)
     localStorage.setItem('loggedIn',true);
    //  <Navigate to="/HomePage" />
    navigate('/HomePage');
     return ;
    } else {
        setError(res)
    }
  }
  return (
    <div className="LoginMain">
      {success && (
        <div className="success">
          <div className="messagesSuccess">
            <img src={tickImage} alt="tickimage" />
            <h1>Success</h1>
            <p>You are Successfully Registered on Our Cloud Platofom. Now Using Username and Password Log into it.</p>
            <button
              onClick={() => {
                setSuccess(false);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {!register && (
        <div className="loginBox">
          <h1>LOGIN</h1>
          <input
            type="text"
            placeholder="UserName"
            value={data.userId}
            onChange={(e) => {
              onChange(e, "userId");
            }}
          />
          <input
            type="number"
            placeholder="Password"
            value={data.password}
            maxLength={4}
            onChange={(e) => {
              onChange(e, "password");
            }}
          />
           {error && (
            <span style={{ color: "red", fontSize: "15px" }}>{error}</span>
          )}
          <button
            disabled={disablelogin}
            style={disablelogin ? { opacity: 0.5 } : null}
            onClick={onLogin}
          >
            Login
          </button>
          <p
            onClick={() => {
              setRegister(true);
            }}
          >
            Register
          </p>
        </div>
      )}
      {register && (
        <div className="loginBox">
          <h1>REGISTER</h1>
          <input
            type="text"
            placeholder="UserName"
            value={rdata.UserName}
            onChange={(e) => {
              onReisterChange(e, "UserName");
            }}
          />
          <input
            type="number"
            placeholder="Password"
            value={rdata.Password}
            maxLength={4}
            onChange={(e) => {
              onReisterChange(e, "Password");
            }}
          />
          <input
            type="number"
            placeholder="ConfirmPassword"
            value={rdata.ConfirmPassword}
            maxLength={4}
            onChange={(e) => {
              onReisterChange(e, "ConfirmPassword");
            }}
          />
          {error && (
            <span style={{ color: "red", fontSize: "15px" }}>{error}</span>
          )}
          <button
            disabled={disableregister}
            style={disableregister ? { opacity: 0.5 } : null}
            onClick={onRegister}
          >
            Register
          </button>
          <p
            onClick={() => {
              setRegister(false);
            }}
          >
            Login
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;

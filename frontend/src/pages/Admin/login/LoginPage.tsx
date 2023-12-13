import "./style.login.css";
import logo from "../../../assets/logo.png";
import { LoginData, login } from "./controller.login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: LoginData = {
      username: username,
      password: password,
    };

    try {
      const response: any = await login(data);
      if (response && response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/Admin");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
      // Handle network error or other issues
    }
  };
  return (
    <div className="login-page">
      <div className="center">
        <img src={logo}></img>
        <form onSubmit={handleLogin}>
          <div className="txt_field">
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="pass">Forgot Password?</div>
          <input type="submit" value="Login" />
          <div className="signup_link">
            Not a member? <a href="#">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

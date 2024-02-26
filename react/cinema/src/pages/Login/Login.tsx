import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ user, setUser }: LoginProps) => {
  const navigate = useNavigate();

  const tryLogin = async () => {
    try {
      const username = (document.getElementById("username") as HTMLInputElement)
        .value;
      const password = (document.getElementById("password") as HTMLInputElement)
        .value;

      const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
        username,
        password,
      });

      if (response.status === 200) {
        setUser(username);
        navigate("/");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">
      <form className="form">
        <label>Username:</label>
        <input name="username" type="text" id="username" />
        <label>Password:</label>
        <input name="password" type="password" id="password" />
        <button type="button" className="submitbutton" onClick={tryLogin}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;

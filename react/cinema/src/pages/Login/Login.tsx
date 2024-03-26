import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const Login = ({ user, setUser }: LoginProps) => {
  const navigate = useNavigate();

  const tryLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        navigate("/admin");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={tryLogin}>
        <label>Username:</label>
        <input name="username" type="text" id="username" />
        <label>Password:</label>
        <input name="password" type="password" id="password" />
        <button type="submit" className="submitbutton">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Login;

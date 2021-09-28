import { useRef } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

function Login(props) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  // const history = useHistory();

  const handleLoginClick = () => {
    //post to /v1/auth/login
    console.log(usernameRef + passwordRef);
    axios
      .post("http://localhost:9999/v1/auth/login",
            {"username": usernameRef.current.value, "password": passwordRef.current.value},
            {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        response=response.data;
        document.cookie = "username=" + response.userForToken.username + "; id=" + response.userForToken.id + "; token=" + response.token;
        props.updateUserState(response.userForToken.username, response.token, response.userForToken.id);
      });
      // history.push("/");
  }

  return (
    <div>
      <form>
        <div>
        <label>Username</label>
      <input ref={usernameRef}></input>
      </div>
      <div>
      <label>Password</label>
      <input type="password" ref={passwordRef}></input>
      </div>
      </form>
      <button onClick={handleLoginClick}>Log in</button>
    </div>
  );
}

export default Login;

import { useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SignUp(props) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const history = useHistory();

  const handleSignUpClick = () => {
    console.log(usernameRef + passwordRef);
    axios
      .post("http://localhost:9999/v1/users",
            {"username": usernameRef.current.value, "password": passwordRef.current.value},
            {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        history.push("/");
      });
  }

  return (
    <div>
      <h3>Sign up for Not Redd It</h3>
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
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
}

export default SignUp;

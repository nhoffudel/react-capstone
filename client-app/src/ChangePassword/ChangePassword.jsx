import "./ChangePassword.css";
import { useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ChangePassword(userState) {
    const id = userState.userState.currentUserID;
  const passwordRef = useRef(null);
  const history = useHistory();

  const handleLoginClick = () => {
    axios
      .put("http://localhost:9999/v1/users/"+id, {"_id": id, "password": passwordRef.current.value},
      {headers: {'Content-Type': 'application/json'}})
      // handle success
      .then((response) => {
          console.log("password changed");
          history.push("/");
      });
  }

  return (
    <div>
      <form>
        <label>New password for {userState.userState.currentUsername}: </label>
      <input type="password" ref={passwordRef}></input>
      </form>
      <button onClick={handleLoginClick}>Change password</button>
    </div>
  );
}

export default ChangePassword;

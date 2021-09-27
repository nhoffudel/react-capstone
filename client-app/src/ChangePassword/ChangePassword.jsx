import { useRef } from 'react';
import axios from 'axios';

function getCookieElement(element) {
    const name = element + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const splitCookie = decodedCookie.split(';');
    for(let i = 0; i <splitCookie.length; i++) {
      let c = splitCookie[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function ChangePassword(userState) {
    const id = userState.currentUserID;
    const username = userState.currentUsername;
  const passwordRef = useRef(null);

  const handleLoginClick = () => {
    //post to /v1/auth/login
    axios
      .put("http://localhost:9999/v1/users/"+id, {"_id": id, "password": passwordRef.current.value})
      // handle success
      .then((response) => {
          console.log("password changed");
      });
  }

  return (
    <div>
      <form>
        <label>New password for {username}</label>
      <input type="password" ref={passwordRef}></input>
      </form>
      <button onClick={handleLoginClick}>Change password</button>
    </div>
  );
}

export default ChangePassword;

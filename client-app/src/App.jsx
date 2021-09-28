import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

// Source code imports
import Title from "./Title/Title";
import Login from "./Login/Login";
import ChangePassword from "./ChangePassword/ChangePassword";
import AddEntry from "./AddEntry/AddEntry";
import Home from "./Home/Home";
import EntryList from "./EntryList/EntryList";

function App(props) {
    let userInfo = {"currentUsername" : null, "currentUserToken" : null, "currentUserID" : null, "loggedIn" : false};
    const [userState, setUserState] = useState(userInfo);
    const [entryState, setEntryState] = useState();

  function getEntries(){
    axios.get('http://localhost:9999/v1/entry/').then(response => {
      console.log(response.data);
      setEntryState(response.data);
   })}

    useEffect(() => getEntries(), [])
    console.log("entryState");
    console.log(entryState);
    
    const updateUserState = ((username, token, id) => {
      let newUserInfo = {"currentUsername" : username, "currentUserToken" : token, "currentUserID" : id,  "loggedIn" : true};
      setUserState(newUserInfo);
    });
    
    const createEntry = ((newTitle, newContent) => {
      let entry = {title : newTitle, content: newContent, author: userState.currentUsername, date: new Date(), loggedIn: userState.loggedIn};
      axios.post("http://localhost:9999/v1/entry/", entry,  {headers: {'Content-Type': 'application/json'}})
      .then(response => {
        console.log(response);
        getEntries();
    })});

    return (
      <div className="App">
      <Title userState={userState}></Title>
      <Router>
          <ol class="navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li> | </li>
          <li>
            <Link to="/Login">Log in</Link>
          </li>
          <li> | </li>
          <li>
            <Link to="/ChangePassword">Change Password</Link>
          </li>
          <li> | </li>
          <li>
            <Link to="/AddEntry">Add blog post</Link>
          </li>
          </ol>
        <Switch>
          <Route path="/Login">
            <Login updateUserState={updateUserState}/>
          </Route>
          <Route path="/ChangePassword">
            <ChangePassword userState={userState}/>
          </Route>
          <Route path="/AddEntry">
            <AddEntry username={userState.currentUsername} createEntry={createEntry}/>
          </Route>
          <Route path="/">
            <EntryList entries={entryState}/>
            {/* <Home/> */}
          </Route>
        </Switch> 
      </Router>
      </div>
    );
  }

export default App;

function Title(userInfo) {
  // const username = "user";
  console.log(`username = ${userInfo.username}`);
  let str = "Not logged in";
  if (userInfo.loggedIn) str = `Logged in as ${userInfo.username}`;
  return (
    <div> 
      <h1>Not Redd It</h1>
      <p>{str}</p>
    </div>
  );
}

export default Title;

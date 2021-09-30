import "./AddEntry.css";
import { useRef } from 'react';

function AddEntry({ username, createEntry }) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleAddEntryClick = () => {
    const newTitle = titleRef.current.value;
    const newContent = contentRef.current.value;

    createEntry(newTitle, newContent);
  }
  if (!username){
    return (
      <div>
        You must be logged in to make a new post.
      </div>
    )
  }
  return (
    <div>
      <p>New blog post by {username}</p>
      <form>
        <div>
      <label>Title: </label>
      <div/>
      <input id="addEntryTitle" ref={titleRef}></input>
      </div>
      <div>
      <label> Content: </label>
      <div/>
      <textarea id="addEntryContent" ref={contentRef}></textarea>
      </div>
      </form>
      <button onClick={handleAddEntryClick}>Add post</button>
    </div>
  );
}

export default AddEntry;

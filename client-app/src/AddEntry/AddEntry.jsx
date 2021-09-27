import { useRef } from 'react';

function AddEntry({ username, createEntry }) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const handleAddEntryClick = () => {
    const newTitle = titleRef.current.value;
    const newContent = contentRef.current.value;

    createEntry(newTitle, newContent);
  }

  return (
    <div>
      <p>New blog post by {username}</p>
      <form>
        <div>
      <label>Title: </label>
      <input ref={titleRef}></input>
      </div>
      <div>
      <label> Content: </label>
      <input ref={contentRef}></input>
      </div>
      </form>
      <button onClick={handleAddEntryClick}>Add post</button>
    </div>
  );
}

export default AddEntry;

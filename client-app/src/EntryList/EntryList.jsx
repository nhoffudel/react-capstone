import Entry from '../Entry/Entry';

function EntryList({entries}) {
  console.log(entries);
  return (
    <div> 
      {
        entries.map(
          (entry, index) => <Entry title={entry.title} content={entry.content} author={entry.author} date={entry.date} key={index} />
        )
      }
    </div>
  );
}

export default EntryList;
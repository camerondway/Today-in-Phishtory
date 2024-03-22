import { ListItem } from "@mui/material";

export default function SetListList({ setList = [] }) {
  let prevSet = null;

  return (
    <>
      {setList.map((song, index) => {
        const isLastSet = index === setList.length - 1;
        let setDisplay = song.set !== "e" ? song.set : "Encore";
        if (song.set !== prevSet && !isLastSet) {
          prevSet = song.set;
        } else {
          setDisplay = null; // For sets that are not displayed
        }

        return (
          <>
            {setDisplay && <div>Set {setDisplay}</div>}
            <ListItem key={song.id}>{song.song}</ListItem>
          </>
        );
      })}
    </>
  );
}

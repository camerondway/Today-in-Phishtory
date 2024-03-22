import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, List } from "@mui/material";
import SetListList from "./SetListList";

export default function ShowAccordion({ shows, setLists }) {
  // setLists.map((list) => {
  //   console.debug("list", list);
  // });
  if (!shows.length) {
    const currentDate = new Date();
    const monthNumber = currentDate.getMonth() + 1;
    const dayNumber = currentDate.getDate().toString();
    return (
      <>
        <h1>
          Whoa! There were no shows on {monthNumber}/{dayNumber}!
        </h1>
        <p>This is a very rare occurance in Phishtory.</p>
      </>
    );
  }
  return (
    <div>
      {shows.map(function (show, i) {
        const headerText = `${show.showyear} - ${show.city}, ${show.state}${
          show.country !== "USA" ? ` ${show.country}` : ""
        } - ${show.venue}`;

        const decodedSetlistNotes = new DOMParser().parseFromString(
          show.setlist_notes,
          "text/html"
        ).body.textContent;
        return (
          <Accordion key={i} defaultExpanded={i === 0 ? true : undefined}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}-content`}
              id={`panel${i}-header`}
            >
              {headerText}
            </AccordionSummary>
            <AccordionDetails>
              <p>Tour: {show.tour_name}</p>
              <List>
                <SetListList setList={setLists[i]} />
              </List>
              <p>{decodedSetlistNotes}</p>
              <Link
                href={`https://phish.in/${show.showdate}`}
                target="_blank"
                rel="noopener"
              >
                show on phish.in
              </Link>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

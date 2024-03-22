import { Container, Box } from "@mui/material";
import "./App.css";
import ShowAccordion from "./components/ShowAccordion";
import { useEffect, useState } from "react";

function App() {
  const [showData, setShowData] = useState("");
  const [showSetLists, setShowSetLists] = useState([]);
  useEffect(() => {
    if (showData !== "") return;
    // Create a new Date object
    const currentDate = new Date();

    // Get the month number and add 1 (to make it 1-indexed)
    const monthNumber = currentDate.getMonth() + 1;
    try {
      const fetchData = async () => {
        const response = await fetch(
          `https://api.phish.net/v5/shows/showmonth/${monthNumber}.json?order_by=showdate&apikey=44F997F19E918F591F20`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Process the fetched data
        const shows = data.data;
        // const dayNumber = currentDate.getDate().toString();
        const dayNumber = "28";
        // Filter out the objects that match the parameters
        const filteredEvents = shows.filter(
          (show) => show.showday === dayNumber && show.artist_name === "Phish"
        );
        setShowData(filteredEvents);
        return filteredEvents;
      };
      fetchData().then(async (data) => {
        // Map over the data array and create an array of promises for each showid
        const promises = data.map(async (item) => {
          const { showdate } = item;
          // https://api.phish.net/v5/setlists/showdate/1997-11-22.json?apikey=YOUR_API_KEY
          const url = `https://api.phish.net/v5/setlists/showdate/${showdate}.json?apikey=44F997F19E918F591F20`;

          // Fetch data for each showid
          const response = await fetch(url);
          if (response.ok) {
            const jsonData = await response.json();
            // Process the jsonData as needed
            return jsonData.data;
          } else {
            throw new Error(`Failed to fetch data for showdate: ${showdate}`);
          }
        });

        try {
          // Wait for all promises to resolve
          const results = await Promise.all(promises);
          // console.log(results); // Array of responses for each showid
          if (results) setShowSetLists(results);
        } catch (error) {
          console.error(error);
        }
      });
    } catch (error) {
      // Handle errors gracefully
      console.error("There was a problem with the fetch operation:", error);
    }
  });

  return (
    <Container maxWidth="sm">
      <Box>
        <ShowAccordion shows={showData} setLists={showSetLists} />
      </Box>
    </Container>
  );
}

export default App;

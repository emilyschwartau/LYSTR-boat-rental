import { Box, Stack, Card, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";

function LandingPageVehicleType() {
  const dispatch = useDispatch();
  const history = useHistory();

  //local state for now but will have to pull from vehicle type in db
  const vehicleList = [
    { id: 1, name: "Pontoon", image_url: "/images/pontoon.jpeg" },
    { id: 2, name: "Runabout", image_url: "/images/runabout.png" },
    { id: 3, name: "Fishing Boat", image_url: "/images/fishingboat.jpeg" },
    { id: 4, name: "Jet Ski", image_url: "/images/jetski.png" },
    { id: 5, name: "Canoe / Kayak", image_url: "/images/kayak.jpeg" },
  ];

  return (
    <>
      {/* page border */}
      <Box sx={{ height: "100vh", width: "100vw", border: "solid black 1px" }}>
        <h1>SELECT VEHICLE TYPE</h1>

        {/* type selection */}
        <Box
          sx={{
            margin: "auto",
            border: "solid black 1px",
            textAlign: "center",
            width: "80%",
            padding: "1em",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ flexWrap: "wrap" }}
          >
            {/* Will eventually map over table from database */}
            {vehicleList?.map((vehicle) => (
              <Card
                key={vehicle.id}
                onClick={() =>
                  dispatch({
                    type: "SET_SEARCH_VEHICLE_TYPE",
                    payload: vehicle.id,
                  })
                }
                sx={{ margin: "1em", height: "20vh", width: "20vw" }}
              >
                <img src={vehicle.image_url} height="70%" />
                <p>{vehicle.name}</p>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
export default LandingPageVehicleType;

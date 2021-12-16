import { Box, Stack, Card, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";

function LandingPageVehicleType() {
  const dispatch = useDispatch();
  const history = useHistory();
  const vehicleTypeId = useSelector((store) => store.search.vehicleType);
  const startDate = useSelector((store) => store.search.startDate);
  const location = useSelector((store) => store.search.location);

  let buttonText = ""

  //local state for now but will have to pull from vehicle type in db
  const vehicleList = [
    { id: 1, name: "Pontoon", image_url: "/images/pontoon.jpeg" },
    { id: 2, name: "Runabout", image_url: "/images/runabout.png" },
    { id: 3, name: "Fishing", image_url: "/images/fishingboat.jpeg" },
    { id: 4, name: "Jet Ski", image_url: "/images/jetski.png" },
    { id: 5, name: "Canoe / Kayak", image_url: "/images/kayak.jpeg" },
  ];

  const handleSearch = () => {
    dispatch({ 
      type: "FETCH_VEHICLES",
      payload: { location: location, startDate: startDate, vehicleType: vehicleTypeId } })
    history.push('/gallery')
  }


  const checkId = () => {
    if (vehicleTypeId === undefined) {
      buttonText = 'Boats'
    } else {
      buttonText = vehicleTypeId + 's'
    }
  }

  // changes value of button text
  // checks store reducer value after boat type is selected
  checkId()
 

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
                    payload: vehicle.name,
                  })
                }
                sx={{ margin: "1em", height: "20vh", width: "20vw" }}
              >
                <img src={vehicle.image_url} height="70%" />
                <p>{vehicle.name}</p>
              </Card>
            ))}
          </Stack>
          <Button
            variant="outlined"
            sx={{
              width: "20%",
              margin: "auto",
            }}
            onClick={ handleSearch }
          >Find {buttonText} to Rent
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default LandingPageVehicleType;

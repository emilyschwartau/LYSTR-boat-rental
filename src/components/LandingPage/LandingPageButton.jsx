import { Box, Stack, Card, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";

function LandingPageButton({ vehicle }) {
    const dispatch = useDispatch();
    const history = useHistory();

    history.push("/gallery")

    return (
        <Stack spacing={2} direction="row">
            <Button variant="outlined">{vehicle}</Button>
        </Stack>

    );
}
export default LandingPageButton;





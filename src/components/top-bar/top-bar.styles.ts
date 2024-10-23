import { Box, styled, Toolbar } from "@mui/material";

export const StyledToolbar = styled(Toolbar)(() => ({
    display: "flex",
    justifyContent: "end",
    padding: "10px 10px !important",
}));

export const UserDataRegion = styled(Box)(() => ({
    width: "300px",
    textAlign: "right"
}));

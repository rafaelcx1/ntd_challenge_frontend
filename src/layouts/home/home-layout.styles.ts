import { Box, styled } from "@mui/material";

export const Content = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh"
}));

export const TopRegion = styled(Box)(() => ({
    width: "100%",
    height: "80px"
}));

export const MainRegion = styled(Box)(() => ({
    width: "100%",
    flexGrow: 1
}));
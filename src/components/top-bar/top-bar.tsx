import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { StyledToolbar, UserDataRegion } from './top-bar.styles';


export interface TopBarProps {
    email?: string
    userBalance?: number
    isLoading: boolean
    onLogout: () => void
}

export const TopBar: React.FC<TopBarProps> = (props) => {
    return (
        <AppBar position="static">
            <StyledToolbar>
                {props.isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <>
                        <UserDataRegion>
                            <Typography variant="h6">{props.email}</Typography>
                            <Typography variant="h6">U$ {props.userBalance?.toFixed(2)}</Typography>
                        </UserDataRegion>

                        <Button
                            sx={{ color: "white", ml: "10px" }}
                            variant="outlined"
                            color="primary"
                            startIcon={<LogoutIcon />}
                            onClick={props.onLogout}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </StyledToolbar>
        </AppBar>
    )
}
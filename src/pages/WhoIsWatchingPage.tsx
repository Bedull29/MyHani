import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const ProfileContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#141414",
    color: "white",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "border 0.2s",
    "&:hover": {
        border: "2px solid white",
    },
}));

function Profile({
    name,
    img,
    onClick,
}: {
    name: string;
    img: string;
    onClick: () => void;
}) {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mx: 2,
                cursor: "pointer",
                "&:hover > div": {
                    borderColor: "white",
                },
                "&:hover > p": {
                    color: "white",
                }
            }}
        >
            <Box
                sx={{
                    width: 100,
                    height: 100,
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "4px",
                    mb: 2,
                    border: "2px solid transparent",
                    transition: "border 0.2s"
                }}
            />
            <Typography variant="body1" color="text.secondary">
                {name}
            </Typography>
        </Box>
    );
}

export function Component() {
    const navigate = useNavigate();
    const handleProfileClick = () => {
        navigate(`/${MAIN_PATH.browse}`);
    };

    return (
        <ProfileContainer>
            <Typography variant="h3" gutterBottom sx={{ mb: 5 }}>
                Siapa yang menonton?
            </Typography>
            <Stack direction="row">
                <Profile
                    name="Hanny"
                    img="https://raw.githubusercontent.com/Bedull29/assets/db72c8922001a4bc77fad2c33bdaf9258643e610/awal/bagian2.jpg"
                    onClick={handleProfileClick}
                />
                <Profile
                    name="Sri"
                    img="https://raw.githubusercontent.com/Bedull29/assets/db72c8922001a4bc77fad2c33bdaf9258643e610/awal/bagian3.jpg"
                    onClick={handleProfileClick}
                />
                <Profile
                    name="Handayani"
                    img="https://raw.githubusercontent.com/Bedull29/assets/db72c8922001a4bc77fad2c33bdaf9258643e610/awal/bagian1.jpg"
                    onClick={handleProfileClick}
                />
            </Stack>
        </ProfileContainer>
    );
}

Component.displayName = "WhoIsWatchingPage";

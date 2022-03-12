import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Divider from '@mui/material/Divider';
import ImageAspectRatioIcon from '@mui/icons-material/ImageAspectRatio';
import { useNavigate } from 'react-router-dom';

import './Menu.css';

export default function Menu() {
    let navigate = useNavigate();

    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText
                    onClick={() => {
                        navigate('/Home');
                    }}
                    primary="Home"
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ImageAspectRatioIcon />
                </ListItemIcon>
                <ListItemText
                    onClick={() => {
                        navigate('/Invitation');
                    }}
                    primary="Convite"
                />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                    onClick={() => {
                        navigate('/Guests');
                    }}
                    primary="Convidados"
                />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                    onClick={() => {
                        //TODO Deslogar
                        navigate('/Login');
                    }}
                    primary="Sair"
                />
            </ListItem>
        </div>
    );
}

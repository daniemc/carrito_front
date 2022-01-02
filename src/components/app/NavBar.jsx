import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link variant="button" color="inherit" href="/productos">
                    Productos
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
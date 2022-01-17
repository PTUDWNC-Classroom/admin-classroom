import * as React from "react"
import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
//import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
//import Typography from '@mui/material/Typography';
import Tooltip from "@mui/material/Tooltip"
//import PersonAdd from "@mui/icons-material/PersonAdd"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: grey[700],
  "&:active": {
    color: grey[900],
  },
}))

export default function AccountUser() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    //REMOVE localStorage
    localStorage.removeItem("isLogin")
    history.replace("/")
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ ml: 2 }}
                color="inherit"
              >
                <AccountCircleIcon/>

          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        //onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <StyledLink to="/profile" onClick={handleClose}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
        </StyledLink>
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider /> */}
        {/* <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Box clone >
          <MenuItem
            onClick={() => {
              handleLogout()
              handleClose()
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Box>
      </Menu>
    </React.Fragment>
  )
}
import React, { useEffect, useState } from "react"
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  ListItem,
  List,
  ListItemText,
} from "@mui/material"
import { styled } from "@mui/system"
import axios from "axios"
import { useLocation } from "react-router"

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
  }))


export default function AdminDetail()
{
    console.log("Admin detail")
    const [user, setUser] = useState([])

    let location = useLocation()
    const id = location.pathname.split("/")[2]

    useEffect(() => {
        document.title = "Admin Detail"
        const getData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_HOST}/admin/getAdminDetailAccount`,
                    {
                        _id: id
                    })
                  console.log(res.data)
                if (res) {
                    setUser(res.data)
                    }
            } 
            catch (error) {
                console.error(error);
            }
        }
        getData();
      }, [id])

    return(
        <Grid container justifyContent="center" spacing={3}>
        <Grid container item xs={12} alignItems="center" direction="column">
          <Grid>
            <Avatar
              sx={{ width: "5rem", height: "5rem", marginBottom: "1rem" }}
              src="/user.svg"
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">{user.username}</Typography>
          </Grid>
        </Grid>
  
        <Grid item md={6} xs={12}>
          <StyledPaper elevation={1}>
            <Grid container spacing={1}>
              <Grid container justifyContent="center" item xs>
                <Typography variant="h5">Account Detail</Typography>
              </Grid>
  
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <Grid container alignItems="center">
                      <Grid item sm={3} xs={12}>
                        <ListItemText>
                          <b>Email</b>
                        </ListItemText>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        <Typography variant="subtitle1">{user.email}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container alignItems="center">
                      <Grid item sm={3} xs={12}>
                        <ListItemText>
                          <b>Create Date:</b>
                        </ListItemText>
                      </Grid>
                      <Grid item sm={9} xs={12}>
                        {
                          user.dateCreate &&
                          <Typography variant="subtitle1">{user.dateCreate.split("T")[0]}</Typography>
                        }
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    )
}
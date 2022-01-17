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


export default function ClassDetail() {
    console.log("Class detail")
    const [classInfo, setClassInfo] = useState([])
    const [gradeStruct, setGradeStruct] = useState([])
    const [studentInfo, setStudentInfo] = useState([])
    const [teacherInfo, setTeacherInfo] = useState([])

    let location = useLocation()
    const id = location.pathname.split("/")[2]

    useEffect(() => {
        document.title = "Class Detail"
        const getData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_HOST}/admin/getClassDetailAccount`,
                    {
                        _id: id
                    })
                console.log(res.data)
                if (res) {
                    setClassInfo(res.data.classInfo)
                    setGradeStruct(res.data.gradeStruct)
                    setStudentInfo(res.data.studentInfo)
                    setTeacherInfo(res.data.teacherInfo)
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        getData();
    }, [id])

    

    return (
        <Grid container justifyContent="center" spacing={3}>
            <Grid container item xs={12} alignItems="center" direction="column">
                <Grid>
                    <Avatar
                        sx={{ width: "5rem", height: "5rem", marginBottom: "1rem" }}
                        src="/user.svg"
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5">{classInfo.className}</Typography>
                </Grid>
            </Grid>

            <Grid item md={6} xs={12}>
                <StyledPaper elevation={1}>
                    <Grid container spacing={1}>
                        <Grid container justifyContent="center" item xs>
                            <Typography variant="h5">Student</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <List>
                                {
                                    studentInfo.length !== 0 && studentInfo.map(function (val, index) {
                                        return (
                                            <ListItem key = {index}>
                                                <Grid container alignItems="center">
                                                    <Grid item sm={3} xs={12}>
                                                        <ListItemText>
                                                            <b>Name:</b>
                                                        </ListItemText>
                                                    </Grid>
                                                    <Grid item sm={9} xs={12}>
                                                        <Typography variant="subtitle1">{val}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )
                                    })
                                }
                                <ListItem>
                                    <Grid container alignItems="center">
                                        <Grid item sm={3} xs={12}>
                                            <ListItemText>
                                                <b>Total</b>
                                            </ListItemText>
                                        </Grid>
                                        <Grid item sm={9} xs={12}>
                                            <Typography variant="subtitle1">{studentInfo.length}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Grid>
            <Grid item md={6} xs={12}>
                <StyledPaper elevation={1}>
                    <Grid container spacing={1}>
                        <Grid container justifyContent="center" item xs>
                            <Typography variant="h5">Teacher</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <List>
                                {
                                    teacherInfo.length !== 0 && teacherInfo.map(function (val, index) {
                                        return (
                                            <ListItem key = {index}>
                                                <Grid container alignItems="center">
                                                    <Grid item sm={3} xs={12}>
                                                        <ListItemText>
                                                            <b>Name:</b>
                                                        </ListItemText>
                                                    </Grid>
                                                    <Grid item sm={9} xs={12}>
                                                        <Typography variant="subtitle1">{val}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )
                                    })
                                }
                                <ListItem>
                                    <Grid container alignItems="center">
                                        <Grid item sm={3} xs={12}>
                                            <ListItemText>
                                                <b>Total</b>
                                            </ListItemText>
                                        </Grid>
                                        <Grid item sm={9} xs={12}>
                                            <Typography variant="subtitle1">{teacherInfo.length}</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Grid>
            <Grid item md={6} xs={12}>
                <StyledPaper elevation={1}>
                    <Grid container spacing={1}>
                        <Grid container justifyContent="center" item xs>
                            <Typography variant="h5">Grade Struct</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <List>
                                {
                                    gradeStruct.length !== 0 && gradeStruct.map(function (val, index) {
                                        return (
                                            <ListItem key = {index}>
                                                <Grid container alignItems="center">
                                                    <Grid item sm={3} xs={12}>
                                                        <ListItemText>
                                                            <b>{val.gradeTitle}</b>
                                                        </ListItemText>
                                                    </Grid>
                                                    <Grid item sm={9} xs={12}>
                                                        <Typography variant="subtitle1">{val.gradeDetail}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        )
                                    })
                                }
                                <ListItem>
                                    <Grid container alignItems="center">
                                        <Grid item sm={3} xs={12}>
                                            <ListItemText>
                                                <b>Total</b>
                                            </ListItemText>
                                        </Grid>
                                        <Grid item sm={9} xs={12}>
                                            <Typography variant="subtitle1">10</Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>

                            </List>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Grid>
            <Grid item md={6} xs={12}>
                <StyledPaper elevation={1}>
                    <Grid container spacing={1}>
                        <Grid container justifyContent="center" item xs>
                            <Typography variant="h5">Class Detail</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <List>
                                <ListItem>
                                    <Grid container alignItems="center">
                                        <Grid item sm={3} xs={12}>
                                            <ListItemText>
                                                <b>Class Name:</b>
                                            </ListItemText>
                                        </Grid>
                                        <Grid item sm={9} xs={12}>
                                            <Typography variant="subtitle1">{classInfo.className}</Typography>
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
                                            <Typography variant="subtitle1">{classInfo.createdDate}</Typography>
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
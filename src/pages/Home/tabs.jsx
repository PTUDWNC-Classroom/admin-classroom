import axios from 'axios';
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, Paper, TextField } from "@mui/material"
import { ListItem, ListItemAvatar, ListItemButton } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from "@mui/material/IconButton"
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { useHistory } from "react-router"
import SearchIcon from '@mui/icons-material/Search';
//import Stack from '@mui/material/Stack';


export default function Tab1Custom() {
    const [adminList, setAdminList] = useState([])
    const [originAdminList, setOriginAdminList] = useState([])
    const [openCreateAdminMenu, setOpenCreateAdminMenu] = useState(false)
    const [valueSearch,setValueSearch] = useState('')
    const [adminInfo, setAdminInfo] = useState(
        {
            username: "",
            password: "",
            email: ""
        }
    )

    const history = useHistory()


    useEffect(() => {
        const user = JSON.parse(localStorage.isLogin)
        const getData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_HOST}/admin/getAdminData`,
                    {
                        user: user
                    })

                if (res) {
                    setAdminList(res.data)
                    setOriginAdminList(res.data)
                }
                //console.log(res.data)
                //console.log(res.data)
            } catch (error) {
                console.error(error);
            }
        }

        getData();
    }, [openCreateAdminMenu])
    //console.log(adminList)

    const sortByname = async () => {
        let newAdminList = []
        newAdminList = newAdminList.concat(adminList);
        setAdminList(newAdminList.sort((a, b) => (a['username'] || "").toString().localeCompare((b['username'] || ""))))
    }

    const sortByDate = async () => {
        setAdminList(originAdminList);
    }

    const handleCreateAdminAccount = async () => {
        //console.log(adminInfo);
        try {
            const res = await axios.post(`${process.env.REACT_APP_HOST}/admin/createAdminAccount`,
                {
                    admin: adminInfo
                })

            if (res) {
                //setAdminList(res.data)
                //setOriginAdminList(res.data)
                alert("Tạo tài khoản Admin thành công!")
                setOpenCreateAdminMenu(false);
                setAdminInfo({
                    username: "",
                    password: "",
                    email: ""
                })
            }
            //console.log(res.data)
            //console.log(res.data)
        } catch (error) {
            alert("Tạo tài khoản Admin không thành công!")
            console.error(error);
        }
    }

    const handleLinkToAdminDetail = async (index) => {
        history.push(`/admin/${adminList[index]._id}`)
    }

    const handleSearch = async()=>
    {
        let array = []
        for(let i = 0; i< originAdminList.length;i++)
        {
            if(originAdminList[i].username.includes(valueSearch))
            {
                array.push(originAdminList[i])
            }
        }
        setAdminList(array)
    }

    return (
        <>
            <Paper sx={{ maxWidth: 1000, my: 1, mx: "auto", p: 1 }}>
                <Button onClick={sortByname}>
                    Sort By Name
                </Button>
                <Button onClick={sortByDate}>
                    Sort By Date
                </Button>
                <IconButton onClick={() => setOpenCreateAdminMenu(true)}>
                    <AddIcon />
                </IconButton>
                <TextField 
                id="outlined-search" 
                label="Search by name" 
                type="search" 
                size='small' 
                value = {valueSearch}
                onChange = {(e)=>{
                    setValueSearch(e.target.value)
                }}
                />
                <Button onClick = {handleSearch}>
                    <SearchIcon />
                </Button>
            </Paper>
            <Paper sx={{ maxWidth: 1000, my: 1, mx: "auto", p: 1 }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {(adminList.length !== 0) &&
                        (adminList).map(function (val, index) {
                            return (
                                <ListItemButton key={index} onClick={() => handleLinkToAdminDetail(index)}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton
                                                size="large"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                sx={{ ml: 2 }}
                                                color="inherit"
                                            >
                                                <AccountCircleIcon />

                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${val.username} ${val.dateCreate.split("T")[0]}`} secondary={val.email} />
                                    </ListItem>
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </Paper>

            <Dialog
                maxWidth="sm"
                fullWidth
                open={openCreateAdminMenu}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Create class"}</DialogTitle>
                <DialogContent
                    sx={{
                        "& .MuiTextField-root": { mb: 2 },
                    }}
                >
                    <TextField
                        id="class-name"
                        label="User name"
                        variant="filled"
                        fullWidth
                        value={adminInfo.username}
                        onChange={(e) => {
                            setAdminInfo(
                                {
                                    username: e.target.value,
                                    password: adminInfo.password,
                                    email: adminInfo.email
                                }
                            )
                        }}
                        required

                    />
                    <TextField
                        id="section"
                        label="Password"
                        variant="filled"
                        value={adminInfo.password}
                        onChange={(e) => {
                            setAdminInfo(
                                {
                                    username: adminInfo.username,
                                    password: e.target.value,
                                    email: adminInfo.email
                                }
                            )
                        }}
                        fullWidth
                        required
                    />
                    <TextField
                        id="subject"
                        label="Email"
                        variant="filled"
                        value={adminInfo.email}
                        onChange={(e) => {
                            setAdminInfo(
                                {
                                    username: adminInfo.username,
                                    password: adminInfo.password,
                                    email: e.target.value,
                                }
                            )
                        }}
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="text"
                        onClick={() => setOpenCreateAdminMenu(false)}
                    >
                        Cancel
                    </Button>
                    <Box sx={{ m: 1, position: "relative" }}>
                        <Button
                            variant="contained"
                            autoFocus
                            type="submit"
                            onClick={handleCreateAdminAccount}
                        >
                            Create
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>

    )
}

export function Tab2Custom() {
    const [userList, setUserList] = useState([])
    const [originUserList, setOriginUserList] = useState([])
    const [colorIcon, setColorIcon] = useState([])
    const [originColorIcon, setOriginColorIcon] = useState([])
    const [valueSearch, setValueSearch] = useState('');
    const history = useHistory();


    useEffect(() => {
        const user = JSON.parse(localStorage.isLogin)
        const getData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_HOST}/admin/getUserData`,
                    {
                        user: user
                    })

                if (res) {
                    setUserList(res.data)
                    setOriginUserList(res.data)
                    let array = []
                    for (let i of res.data) {
                        if (i.isBlock === true) {
                            array.push('red')
                        }
                        else {
                            array.push('black')
                        }
                    }
                    setColorIcon(array)
                    setOriginColorIcon(array)
                }
                //console.log(res.data)
                //console.log(res.data)
            } catch (error) {
                console.error(error);
            }
        }

        getData();
    }, [])
    //console.log(userList)

    const handleBlock = async (index) => {
        try {
            await axios.post(`${process.env.REACT_APP_HOST}/admin/blockUser`,
                {
                    user: userList[index]
                })
            //console.log(res.data)
            //console.log(res.data)
        } catch (error) {
            console.error(error);
        }

        let newColorIcon = []
        newColorIcon = newColorIcon.concat(colorIcon)
        //console.log(colorIcon)
        //console.log(newColorIcon)
        if (newColorIcon[index] === 'black') {
            newColorIcon[index] = 'red'
        }
        else {
            newColorIcon[index] = 'black'
        }
        setColorIcon(newColorIcon)
    }

    const sortByname = async () => {
        let newUserList = []
        newUserList = newUserList.concat(userList);
        const newUserList_sorted = newUserList.sort((a, b) => (a['username'] || "").toString().localeCompare((b['username'] || "")))
        setUserList(newUserList_sorted)
        let array = []
        for (let i of newUserList_sorted) {
            if (i.isBlock === true) {
                array.push('red')
            }
            else {
                array.push('black')
            }
        }
        setColorIcon(array)

    }

    const sortByDate = async () => {
        setUserList(originUserList);
        let array = []
        for (let i of originUserList) {
            if (i.isBlock === true) {
                array.push('red')
            }
            else {
                array.push('black')
            }
        }
        setColorIcon(array)
    }
    //console.log(colorIcon)

    const handleLinkToUserDetail = async (index) => {
        history.push(`/user/${userList[index]._id}`)
    }

    const handleSearch = async()=>
    {
        let array = []
        let blockArray = []
        for(let i = 0; i< originUserList.length;i++)
        {
            if(originUserList[i].username.includes(valueSearch))
            {
                array.push(originUserList[i])
                blockArray.push(originColorIcon[i])
            }
        }
        setUserList(array)
        setColorIcon(blockArray)
    }

    return (
        <>
            <Paper sx={{ maxWidth: 1000, my: 1, mx: "auto", p: 1 }}>
                <Button onClick={sortByname}>
                    Sort By Name
                </Button>
                <Button onClick={sortByDate}>
                    Sort By Date
                </Button>
                <TextField 
                id="outlined-search" 
                label="Search by name" 
                type="search" 
                size='small' 
                value = {valueSearch}
                onChange = {(e)=>{
                    setValueSearch(e.target.value)
                }}
                />
                <Button onClick = {handleSearch}>
                    <SearchIcon />
                </Button>
            </Paper>
            <Paper sx={{ maxWidth: 1000, my: 1, mx: "auto", p: 1 }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {(userList.length !== 0) &&
                        (userList).map(function (val, index) {
                            return (
                                <ListItem key={index} >
                                    <ListItemButton onClick={() => handleLinkToUserDetail(index)}>
                                        <ListItemAvatar>
                                            <IconButton
                                                size="large"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                sx={{ ml: 2 }}
                                                color="inherit"
                                            >
                                                <AccountCircleIcon />

                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${val.username}`} secondary={val.email} />
                                    </ListItemButton>
                                    <IconButton onClick={() => handleBlock(index)}>
                                        <BlockIcon style={{ color: `${colorIcon[index]}` }} />
                                    </IconButton>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
        </>

    )
}

export function Tab3Custom() {
    const [classList, setClassList] = useState([])
    const [originClassList, setOriginClassList] = useState([])
    const [valueSearch,setValueSearch] = useState('')
    const history = useHistory();


    const sortByname = async () => {
        let newClassList = []
        newClassList = newClassList.concat(classList);
        setClassList(newClassList.sort((a, b) => (a['className'] || "").toString().localeCompare((b['className'] || ""))))
    }

    const sortByDate = async () => {
        setClassList(originClassList);
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.isLogin)
        const getData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_HOST}/admin/getClassData`,
                    {
                        user: user
                    })

                if (res) {
                    setClassList(res.data)
                    setOriginClassList(res.data)
                }
                //console.log(res.data)
                //console.log(res.data)
            } catch (error) {
                console.error(error);
            }
        }

        getData();
    }, [])
    //console.log(classList)

    const handleLinkToClassDetail = (index) => {
        history.push(`/class/${classList[index]._id}`)
    }

    const handleSearch = async()=>
    {
        let array = []
        for(let i = 0; i< originClassList.length;i++)
        {
            if(originClassList[i].className.includes(valueSearch))
            {
                array.push(originClassList[i])
            }
        }
        setClassList(array)
    }

    return (
        <>
            <Paper sx={{ maxWidth: 1000, my: 1, mx: "auto", p: 1 }}>
                <Button onClick={sortByname}>
                    Sort By Name
                </Button>
                <Button onClick={sortByDate}>
                    Sort By Date
                </Button>
                <TextField 
                id="outlined-search" 
                label="Search by name" 
                type="search" 
                size='small' 
                value = {valueSearch}
                onChange = {(e)=>{
                    setValueSearch(e.target.value)
                }}
                />
                <Button onClick = {handleSearch}>
                    <SearchIcon />
                </Button>
            </Paper>
            <Paper sx={{ maxWidth: 1000, my: 1, mx: "auto", p: 1 }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {(classList.length !== 0) &&
                        (classList).map(function (val, index) {
                            return (
                                <ListItemButton key={index} onClick={() => handleLinkToClassDetail(index)}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <IconButton
                                                size="large"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                sx={{ ml: 2 }}
                                                color="inherit"
                                            >
                                                <AccountCircleIcon />

                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText primary={val.className} />
                                    </ListItem>
                                </ListItemButton>
                            )
                        })
                    }
                </List>
            </Paper>
        </>

    )
}
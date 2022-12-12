import React, { useContext, useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios'
import { BottomNavigation, Button, List, ListItem, Pagination, TextField, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { LoadingContext } from "../App";

const Dashboard = () => {
    const { showLoading, hideLoading } = useContext(LoadingContext);
    const [dishes, setDishes] = useState([])
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(1)
    const [dish,setDish]=useState("");
    useEffect(()=>{
        showLoading()
        axios.get(`http://localhost:5000/dishes?name=${dish}&page=${page}`)
        .then(res=>{
            setDishes(res.data.data)
            setCount(Math.ceil(res.data.metadata?.total/res.data.metadata?.limit))
            hideLoading()
        }).catch(e=>{
            hideLoading()
        })
    },[page,dish])
    const handleSearch=(e)=>{
        setPage(1)
        setDish(e.target.value)
    }

    return (
        <Grid container mt={2}>
            <Grid item xs={3} p={2}>
                <Grid container mb={2}>
                    <Grid item xs={8}>
                        <Typography variant="h5" component="h1">Dishes</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to={`new`}><Button variant="contained">Create</Button></Link>
                    </Grid>
                </Grid>
                <TextField
                    id="search-bar"
                    className="text"
                    onInput={handleSearch}
                    label="Enter a dish name"
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                />
                <List>
                    {
                        dishes && dishes.map((item, i) => {
                            return (
                                <Link key={i} className="item" to={`dish/${item._id}`}>

                                    <ListItem>
                                        {item.name}
                                    </ListItem>

                                </Link>
                            )
                        })
                    }
                </List>
                <Pagination count={count} color="primary" page={page} onChange={(e,v)=>setPage(v)} />
            </Grid>
            <Grid item xs={9}>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default Dashboard;
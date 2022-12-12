import { Button, FormControl, FormGroup, FormLabel, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../App";
const Dish = () => {
    const {id}=useParams();
    const { showLoading, hideLoading } = useContext(LoadingContext);
    const [dish, setDish] = useState("")
    const [ingredients, setIngredients] = useState([])
    const names = [
        'Flour',
        'Water',
        'Vegetable',
        'Salt',
        'Oil',
        'Chiken',
        'Tomato',
        'Potato',
        'Onion',
        'Ghee',
    ];
    useEffect(()=>{
        showLoading()
        axios.get(`http://localhost:5000/dishes/${id}`)
        .then(res=>{
            setDish(res.data?.data?.name)
            setIngredients(res.data?.data?.ingredients)
            hideLoading()
        }).catch(e=>{
            hideLoading()
        })
    },[id])
    const handleSubmit = () => {
        showLoading()
        if (dish!=="" && ingredients.length>0) {
            axios.patch(`http://localhost:5000/dishes/${id}`,{
                name:dish,
                ingredients:ingredients
            }).then(()=>{
                hideLoading()
            }).catch(e=>{
                hideLoading()
            })
        }
    }
    return (
        <Container >
            <FormGroup >
                <FormLabel>
                    Dish
                </FormLabel>
                <FormControl>
                    <TextField variant="outlined" required value={dish} onChange={(e)=>setDish(e.target.value)}/>
                </FormControl>
            </FormGroup>
            <FormGroup >
            <FormLabel>
            Ingredients 
                </FormLabel>
                <FormControl>
                    <Select required
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        variant="outlined"
                        placeholder="Select ingredients"
                        onChange={(event) => setIngredients(event.target.value)}
                        value={ingredients}
                    >
                        {names.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </FormGroup>
            <Grid mt={2} textAlign='right'>
                <Button  onClick={handleSubmit} variant="contained" color="primary">Update</Button>
            </Grid>
        </Container>
    )
}
export default Dish;
import { Button, FormControl, FormGroup, FormLabel, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useContext, useState } from "react";
import { LoadingContext } from "../App";
const NewDish = () => {
    const { showLoading, hideLoading } = useContext(LoadingContext);
    const [dish, setDish] = useState({name:"",ingredients:[]})
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
    const handleSubmit = () => {
        showLoading()
        if (dish.name!=="" && dish.ingredients.length>0) {
            axios.post(`http://localhost:5000/dishes`,dish).then(()=>{
                window.location.reload();
                hideLoading()     
            }).catch(e=>{
                hideLoading()
            })
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
          setDish(prevState => ({ ...prevState, [name]: value }))
      }
    return (
        <Container >
            <FormGroup >
                <FormLabel>
                    Dish
                </FormLabel>
                <FormControl>
                    <TextField variant="outlined" name="name" value={dish.name} onChange={handleChange}/>
                </FormControl>
            </FormGroup>
            <FormGroup >
            <FormLabel>
            Ingredients 
                </FormLabel>
                <FormControl>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        variant="outlined"
                        placeholder="Select ingredients"
                        name="ingredients"
                        onChange={handleChange}
                        value={dish.ingredients}
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
                <Button  onClick={handleSubmit} variant="contained" color="primary">Save</Button>
            </Grid>
        </Container>
    )
}
export default NewDish;
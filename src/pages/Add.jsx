import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { toast } from 'react-toastify'
import { baseUrl } from '../api'

export default function Add() {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        amount: 0,
        category: "",
    })
    const[isLoading,setIsLoading]=useState(false)
    //console.log(formData);
    const handleSumbit= async ()=>{
        //  console.log(formData);
        setIsLoading(true)
        try {
            const res= await axios.post(`${baseUrl}/api/expense/insert`,formData);
            //console.log(res)
            if (res.data.success) {
                toast.success(res.data.message)
                setTimeout(()=>{navigate("/")},2000)
            } else {
               toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            }finally{
                setTimeout(()=>{setIsLoading(false)},2000)
            }
        };
    return (
        <Box>
            <Box sx={{ textAlign: "center" }}>
                <Typography variant='h4'>
                    Add Expense Details
                </Typography>
            </Box>
            <Box sx={{
                backgroundColor: "lightblue", p: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Paper sx={{ width: "70%", p: 3 }}>
                    <TextField fullWidth
                    value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        label="Enter Expense Title"
                        placeholder='enter expense title here' sx={{ mb: 2 }} />
                    <TextField fullWidth type="number" 
                     value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    label="Enter Expense Amount"
                        placeholder='enter expense amount here' sx={{ mb: 2 }} />
                    <FormControl sx={{ mb: 1 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">Select expense Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Select  expense Category"
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                             value={formData.category}
                            // onChange={handleChange}
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value={"Transport"}>Transport</MenuItem>
                            <MenuItem value={"Food"}>Food</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSumbit}
                    sx={{ mb: 1 }} variant='contained'
                        color="primary" fullWidth loading={isLoading}>Submit</Button>
                    <Button component={Link} to={"/"} sx={{ mb: 1 }}
                        variant='outlined'
                        color="secondary" fullWidth>View entries</Button>
                </Paper>
            </Box>
        </Box>
    )
}

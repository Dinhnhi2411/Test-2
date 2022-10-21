import React,{useState} from 'react';
import {  Button, Divider, TextField, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import apiService from '../api/apiService';


function MSearch() {
  const [loading, setLoading] = useState();
  const [searchJob, setSearchJob] = useState([]);
  const [searchInput, setSearchInput]= useState(1)
  const [jobs, setJobs] = useState([]);
  // const url =`https://frcz3.sse.codesandbox.io/jobs?_page=${page}&_limit=10`
  
  
  React.useEffect(()=> {
  
    const fetchData = async() =>{
      try{
        setLoading(true)
        const res = await apiService.get(`jobs?_page=1&_limit=10?q=${searchJob}`);
        setJobs(res.data)
        setLoading(false);
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchData();
    
  },[searchJob])
  
  const handleSubmit =(e) =>{
    e.preventDefault();
    setSearchJob(searchInput);
  }
  
  return (
    <Box className="App">
    <h1> Test React</h1>
    <Typography
    display="flex"

    textAlign="center"
    justifyContent="center"
    >
    <TextField
    onChange={(e)=> setSearchInput(e.target.value)}
    placeholder="search..."
    value={searchInput}
    inputProps={{ 'aria-label': 'search' }}
    />
    <Button
    color="secondary"
    onClick={handleSubmit}
    >
    Search

    </Button>
    </Typography>
    <Divider/>
    
    </Box>



  )

}

export default MSearch;

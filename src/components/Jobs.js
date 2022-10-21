import React,{useState} from "react";
import { Typography } from "@mui/material";
import apiService from "../api/apiService";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";

import MSearch from "./MSearch";

function Jobs() {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState();
  const [pageId, setPage]= useState(1)
  // const url =`https://frcz3.sse.codesandbox.io/jobs?_page=${page}&_limit=10`
  console.log("data")
  
  React.useEffect(()=> {
  
    const fetchData = async() =>{
      try{
        setLoading(true)
        const res = await apiService.get(`jobs?_page=${pageId}&_limit=10`);
        setJob(res.data)
        // console.log("job",job)
        setLoading(false);
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchData();
    
  },[pageId])
  
  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );


  // 
  const handleNext = ()=>{
    setPage((pageId)=> pageId + 1)
  }
  const handlePrev = ()=>{
    setPage((pageId)=> pageId - 1)
  }
  return (
    <>
  
   
       <MSearch/>      
      <Typography mb={1} variant="h5" fontWeight={600} color="primary">
      {loading
      ? placeholder.map((item)=> (
        <Typography>
        {detailSkeleton}
        </Typography>
      ))
      : job.map((item)=>(
        <Typography
        key={item.id}
        margin="20px"
        >
          {item.title}
        </Typography>
      ))}
     
      </Typography>
        <Box>
        <Button color="success"
        onClick={handlePrev}
        >
          Prev
        </Button>
        <Button color="success"
        onClick={handleNext}
        >
          Next
        </Button>
        </Box>



  
    </>
  );
}

export default Jobs;

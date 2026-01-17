import React from 'react';
import { VStack } from '@chakra-ui/react';
import EmployeeTable from './components/ui/EmployeeTable';
import { useQuery } from '@tanstack/react-query';
import {baseUrl} from '../constants/global-variable'

const App=()=>{
  async function fetchEmployeeDetails(params){
    const res=await fetch(baseUrl);
    const data=await res.json();
    if(!res.ok){
      throw new Error(data.error);
    }
    return data;
  }
  const {isPending, isError,data,error}=useQuery({
    queryKey:['empoloyee_details'],
    queryFn:fetchEmployeeDetails
  });
  if(isPending){
    return "Loading...";
  }
  if(isError){
    return error.message;
  }
  console.log("data from postgre db:",data);
  return (
    <VStack gap="6" align="flex-start">
      <EmployeeTable data={data}/>
    </VStack>
  )
}

export default App;
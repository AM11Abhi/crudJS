import React from 'react';
import { VStack } from '@chakra-ui/react';
import EmployeeTable from './components/ui/EmployeeTable';
import InputEmployee from './components/ui/InputEmployee.jsx';
import { useQuery } from '@tanstack/react-query';
import {baseUrl} from '../constants/global-variable'
import SplitText from "./components/ui/SplitText.jsx";
import { Dialog,DialogTrigger,Button } from '@chakra-ui/react';



const App=()=>{
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  async function fetchEmployeeDetails(params){
    const res=await fetch(baseUrl);
    const data=await res.json();
    if(!res.ok){
      throw new Error(data.error);
    }
    return data;
  }
  const {isPending, isError,data,error}=useQuery({
    queryKey:['employee_details'],
    queryFn:fetchEmployeeDetails
  });
  if(isPending){
    return "Loading...";
  }
  if(isError){
    return error.message;
  }
  return (

  <VStack gap="6" align="flex-start">
      <SplitText
        text="CRUDJS - Employee Management App"
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
          <InputEmployee >
          <DialogTrigger asChild>
            <Button variant="outline">Add Employee</Button>
          </DialogTrigger>
        </InputEmployee>
        <EmployeeTable data={data}/>
    </VStack> 
  )
}

export default App;
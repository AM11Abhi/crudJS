import React, { Children } from 'react'
import {
  Button,
  CloseButton,
  Dialog,
  For,
  Input,
  HStack,
  Portal,
  VStack,
  Steps,
} from "@chakra-ui/react"
import {Field} from "./field.jsx"
import toast from 'react-hot-toast';
import SelectRole from './SelectRole.jsx'
import {useState} from 'react'
import { useMutation } from '@tanstack/react-query';
import { baseUrl } from '../../../constants/global-variable.js';
import {queryClient} from '../../../utils/queryClient.js'
const InputEmployee = ({children,type="add",data}) => {
  const mutation=useMutation({
    mutationFn: async(info)=>{
      const res=await fetch( baseUrl,{
          method:"POST",
          body:JSON.stringify(info),
          headers:{
            "Content-Type":"application/json"
          },
        });
        const data=await res.json();
        if(!res.ok){
          throw new Error(data.error);
        }
        return data;
      },
      onError:(error)=>{
        toast.error(error.message);

      },
      onSuccess:()=>{
        setInfo({name:"",email:"",age:"",role:"",salary:""})
        setOpen(false);
        toast.success("Employee data added successfully");
        queryClient.invalidateQueries({queryKey:["employee_details"]});
      },
  })
  const updateMutation=useMutation({
    mutationFn: async(info)=>{
      const res=await fetch( baseUrl+"/"+info.id,{
          method:"PUT",
          body:JSON.stringify(info),
          headers:{
            "Content-Type":"application/json"
          },
        });
        const data=await res.json();
        if(!res.ok){
          throw new Error(data.error);
        }
        return data;
      },
      onError:(error)=>{
        toast.error(error.message);

      },
      onSuccess:()=>{
        setInfo({name:"",email:"",age:"",role:"",salary:""})
        setOpen(false);
        toast.success("Employee updated added successfully");
        queryClient.invalidateQueries({queryKey:["employee_details"]});
      },
  })
  const[info,setInfo]=useState(type==="add"?{name:"",email:"",age:"",role:"",salary:""}:data);
  const[open,setOpen]=useState(false);
  const handleChange=(e)=>{
    setInfo((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
  console.log(info);
  const requiredFields=["name","email","age","salary"];
  function handleSubmit(){
    for(const key of requiredFields){
      if(!info[key].toString().trim()){
        toast.error("Please fill all required fields");
        return;
      }  
    }
    const infoUpdated={...info,role: info.role||null}
    if(type==="add"){
      mutation.mutate(infoUpdated);
    }
    else{
      updateMutation.mutate(infoUpdated);
    }
  }
  return (
    <Dialog.Root
            open={open} onOpenChange={(e)=>setOpen(e.open)}
            placement="center"
            motionPreset="slide-in-bottom"
          >
            {children}
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{type==="add"?"Add Employee":"Update Employee"}</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack gap="4" alignItems="flex-start">
                      <Field label="Name" required>
                        <Input name="name" placeholder="Enter username" value={info.name} onChange={handleChange} />
                      </Field>
                      <Field label="Email" required>
                        <Input name="email" placeholder="Enter email" value={info.email}onChange={handleChange} />
                      </Field>
                      <Field label="Age" required>
                        <Input name="age" placeholder="Enter age" type="number" value={info.age} onChange={handleChange}/>
                      </Field>
                      <Field label="Role" required>
                        <SelectRole setInfo={setInfo}/>
                      </Field>
                      <Field label="Salary" required>
                        <Input name="salary" placeholder="Enter salary" value={info.salary} onChange={handleChange}  />
                      </Field>
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button onClick={handleSubmit}>Save</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
  )
}

export default InputEmployee
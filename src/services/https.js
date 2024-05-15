import axios from 'axios';

const APIURl='http://localhost:8000'
export const uploadFile=async(data)=>{
 try{
    let respone = await axios.post(`${APIURl}/upload`,data)
    return respone.data;
 }catch(error){
console.log(error)
 }   
}

export const downloadFile=async(data)=>{
   try{
 let respone = await axios.get(`${APIURl}/file/${data}`)
 return respone.data;
   }
   catch(error){
      console.log(error)
   }
}

export const registerUser=async(data)=>{
   try{
 let respone = await axios.post(`${APIURl}/register`, data)
 return respone.data;
   }
   catch(error){
      return error.response.data.error;
   }
}

export const loginUser=async(data)=>{
   try{
 let respone = await axios.post(`${APIURl}/login`, data)
 return respone;
   }
   catch(error){
      return error.response.data.error;
   }
}

export const getUser=async(data)=>{
   try{
 let respone = await axios.get(`${APIURl}/getUser/${data}`)
 return respone.data;
   }
   catch(error){
      console.log(error)
   }
}

export const getUserFiles=async(data)=>{
   try{
 let respone = await axios.get(`${APIURl}/getUser/files/${data}`)
 return respone.data;
   }
   catch(error){
      console.log(error)
   }
}

import { TodoFormData } from "@/app/types/index";

const DB_URL = process.env.NEXT_PUBLIC_API_URL

export default async function  postSchedule(data:TodoFormData){
    const res = await fetch(`${DB_URL}/registr`,{
        method:'POST',
        headers:{
             "Content-Type": "application/json",
        },
         body: JSON.stringify(data),
    })
    const resData = await res.json();
    console.log(resData)
    return resData
}
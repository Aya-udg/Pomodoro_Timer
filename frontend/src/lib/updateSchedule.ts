import { Schedule } from "@/app/types/index";

const DB_URL = process.env.NEXT_PUBLIC_API_URL

export default async function  updateSchedule(schedule: Schedule):Promise<Schedule[]>{
    const res = await fetch(`${DB_URL}/update/${schedule.id}`,{
    method: 'PUT',
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(schedule)
})
if(!res.ok){
    console.log('更新に失敗しました')
}
    const resData = await res.json();
    console.log(resData)
    return resData
}
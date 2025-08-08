import { TodoFormData } from "@/app/types/index";

const DB_URL = process.env.NEXT_PUBLIC_API_URL

import { Schedule } from "@/app/types/index";

export async function  getSchedule():Promise<Schedule[]>{
    const res = await fetch(`${DB_URL}/schedule`,{
        cache: 'no-cache'
});
if(!res.ok){
    console.error('データの取得に失敗しました',res.status)
    return []
}
    const resData = await res.json();
    return resData
}

export async function  postSchedule(data:TodoFormData){
    const res = await fetch(`${DB_URL}/schedule-registr`,{
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

export async function  deleteSchedule(id: string){
    const res = await fetch(`${DB_URL}/schedule-delete/${id}`,{
    method: 'DELETE'
})
if(!res.ok){
    console.log('更新に失敗しました')
}
    const resData = await res.json();
    console.log(resData)
    return resData
}

export async function updateSchedule(schedule: Schedule):Promise<Schedule[]>{
    const res = await fetch(`${DB_URL}/schedule-update/${schedule.id}`,{
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
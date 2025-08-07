import { Schedule } from "@/app/types/index";

const DB_URL = process.env.NEXT_PUBLIC_API_URL

export default async function  getSchedule():Promise<Schedule[]>{
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
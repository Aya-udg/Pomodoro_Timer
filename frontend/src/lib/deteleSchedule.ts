
const DB_URL = process.env.NEXT_PUBLIC_API_URL

export default async function  deleteSchedule(id: string){
    const res = await fetch(`${DB_URL}/delete/${id}`,{
    method: 'DELETE'
})
if(!res.ok){
    console.log('更新に失敗しました')
}
    const resData = await res.json();
    console.log(resData)
    return resData
}
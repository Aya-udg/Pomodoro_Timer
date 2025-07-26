import { redirect } from 'next/navigation'
import {FormValues} from '@/app/types/index'

export default async function postUser({email,password}:FormValues){
    const res = await fetch("http://127.0.0.1:8000/users/register/",{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({email,password})
    })
    if(res.ok){
        const data = await res.json();
        console.log('登録しました')
        redirect('/')
    }else{
        const error = await res.json()
        console.error('登録に失敗しました')
    }
}
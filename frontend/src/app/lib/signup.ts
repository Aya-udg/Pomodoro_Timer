import { redirect } from 'next/navigation'
import {FormValues} from '@/app/types/index'

export default async function singup({username,password}:FormValues){
    const res = await fetch("/api/signup",{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({username,password})
    })
    if(res.ok){
        const data = await res.json();
    }else{
        const error = await res.json()
    }
}
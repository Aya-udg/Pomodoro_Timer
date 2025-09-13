import {FormValues} from '@/app/types/index'

export default async function singup({username,password}:FormValues){
    const res = await fetch("/api/signup",{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({username,password})
    })
  const result = await res.json();
  if (!res.ok)
    return { ok: false, status: res.status,error:result.error};
  return { ok: true, status: res.status, data: result.data };
}
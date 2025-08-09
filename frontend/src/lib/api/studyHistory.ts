import { StudyHistory } from "@/app/types/index";

const DB_URL = process.env.NEXT_PUBLIC_API_URL

export async function getStudyHistoryDay(username:string) {
    const res = await fetch("/api/study",{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(username)
    })
    if(!res.ok){
        return console.log('エラー発生')
    }
    const date = await res.json()
    return date
}

// export async function getStudyHistoryTag() {
//     const res = await fetch("/api/study")
//     if(!res.ok){
//         return console.log('エラー発生')
//     }
//     const date = await res.json()
//     return date
// }


export default async function postStudyHistory(pos: StudyHistory) {
  const res = await fetch("/api/study", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pos),
  });
  console.log(res)
  if (!res.ok) {
    console.log("エラー");
  }
  const data = await res.json();
  console.log("登録成功", data);
  return data;
}

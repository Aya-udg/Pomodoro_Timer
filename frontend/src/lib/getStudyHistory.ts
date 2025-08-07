
const DB_URL = process.env.NEXT_PUBLIC_API_URL

export async function getStudyHistoryDay(username:string) {
    const res = await fetch(`${DB_URL}/studyhistory/summary-by-date`,{
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

export async function getStudyHistoryTag() {
    const res = await fetch(`${DB_URL}/studyhistory/summary-by-tag`)
    if(!res.ok){
        return console.log('エラー発生')
    }
    const date = await res.json()
    return date
}
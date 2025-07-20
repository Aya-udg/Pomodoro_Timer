export default async function getStudyHistory() {
    const res = await fetch('http://127.0.0.1:8000/studyhistory')
    if(!res.ok){
        return console.log('エラー発生')
    }
    const date = await res.json()
    return date
}
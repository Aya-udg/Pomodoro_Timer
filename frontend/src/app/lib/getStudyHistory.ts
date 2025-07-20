export async function getStudyHistoryDay() {
    const res = await fetch('http://127.0.0.1:8000/studyhistory/summary-by-date')
    if(!res.ok){
        return console.log('エラー発生')
    }
    const date = await res.json()
    return date
}

export async function getStudyHistoryTag() {
    const res = await fetch('http://127.0.0.1:8000/studyhistory/summary-by-date')
    if(!res.ok){
        return console.log('エラー発生')
    }
    const date = await res.json()
    return date
}
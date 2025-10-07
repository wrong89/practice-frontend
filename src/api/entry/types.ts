export interface CreateEntry {
    course: string,
    date: string,
    payment_method: string,
    user_id: number
}

export interface CreateEntryResponse {
    "course": string
    "date": string,
    "user_id": number,
    "payment_method": string,
    "status": string,
}
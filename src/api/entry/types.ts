export interface CreateEntry {
    course: string,
    date: string,
    payment_method: string,
    user_id: number
}

export interface Entry {
    "ID": number,
    "Course": string,
    "Date": string,
    "UserID": number,
    "PaymentMethod": string,
    "Status": string,
}

export interface GetEntriesResponse {
    entries: Entry[]
}
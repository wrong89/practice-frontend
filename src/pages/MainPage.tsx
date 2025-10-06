import axios from "axios"
import { useState } from "react"

// const SERVER_ADDRESS = "http://localhost:9091/api"

async function getTestData() {
    const res = await axios.get<string>("http://localhost:9091/api/test")
    console.log("Response", res)
    console.log("Response Data", res.data)
    return res.data
}

const MainPage = () => {
    // const [send, setSend] = useState(false)
    const [data, setData] = useState("")

    return (
        <>
            <h1>MainPage</h1>
            <div className="card">
                <button onClick={async () => {
                    const d = await getTestData()
                    setData(d)
                }}>
                    Отправить запрос
                </button>
            </div>
            {data.length > 0 && <h1>ResultData: <span style={{ color: "lightgreen" }}>{data}</span></h1>}
        </>
    )
}

export default MainPage
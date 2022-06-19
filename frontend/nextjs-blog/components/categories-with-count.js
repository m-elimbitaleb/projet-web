import {useEffect, useState} from "react";
import {Tag} from "antd";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcyLCJlbWFpbCI6ImFkbWluQGR3bS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTU2NTcxNzMsImV4cCI6MTY1NTc0MzU3M30.uudqpHQXCexG478SPFle-KUvLFG5VHGJXqrAaEBKNvI";

export default function CategoriesWithCount() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/categories`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data</p>

    return (
        <div style={{marginBottom: 20}}>
            <h1>Categories</h1>
            {data.map((cat, i) => {
                return (<Tag color={getRandomColor()}>{cat.nom} ({cat.articleCount})</Tag>)
            })}
        </div>
    )
}

export function getRandomColor() {
    const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
}
import {useEffect, useState} from "react";
import {Card, Space, Tag} from "antd";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcyLCJlbWFpbCI6ImFkbWluQGR3bS5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTU2NTcxNzMsImV4cCI6MTY1NTc0MzU3M30.uudqpHQXCexG478SPFle-KUvLFG5VHGJXqrAaEBKNvI";

export default function LastArticles() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const take = 10;
    const skip = 0;

    useEffect(() => {
        setLoading(true)
        fetch(`/api/articles?take=${take}&skip=${skip}`, {
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
        <div>
            <h1>Last 10 articles</h1>
            {data.map((article, i) => {
                return (
                    <Space direction="horizontal" style={{margin: 5}}>
                        <Card title={capitalize(article.titre)}
                              style={{width: 300, margin: 10}}
                              cover={<img alt="example" src={getRandomImage(i)}/>}
                        >
                            <p>{article.contenu}</p>
                        </Card>
                    </Space>
                )
            })}
        </div>
    )
}

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRandomImage(i) {
    return `https://random.imagecdn.app/300/200?disableCache=${i}`;
}
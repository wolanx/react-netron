import React, { useEffect, useState } from 'react'
// import css from './index.module.css'

export default function ReactOnnx() {
    return <h1>Hello, world!</h1>
}

export function useOnnx(url) {
    const [data, setData] = useState(null)
    useEffect(() => {
        console.log(url)
        setTimeout(async () => {
            const resp = await fetch(url)
            const blob = await resp.blob()
            // setData(blob)
        }, 0)
    }, [])
    if (data) {
        return data
    }
    return 'qwe'
}

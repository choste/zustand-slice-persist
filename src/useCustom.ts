import { useState, useEffect } from 'react'
import store from './store'

const asyncAction = ():Promise<{cats: number}> => new Promise((resolve, reject) => {
    setTimeout(() => { resolve({cats: 3}) }, 250)
})

function useCustom() {
    const [loading, setLoading] = useState(true)
    const { cats, addCat } = store()
    useEffect(() => {
        const doStuff = async () => {
            const { cats } = await asyncAction()
            for (var i = 0; i < cats; i++) {
                addCat()
            }
            setLoading(false)
        }
        doStuff()
    }, [])

    return { cats, loading}
}

export default useCustom
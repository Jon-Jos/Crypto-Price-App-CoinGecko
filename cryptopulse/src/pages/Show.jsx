import React from 'react'
import showStore from '..stores/showStore'

export default function Show() {
    const store = showStore()
    React.useEffect(() => {
        store.fetchData()
    }, [])
    return (
        <div>Show</div>
    )
}

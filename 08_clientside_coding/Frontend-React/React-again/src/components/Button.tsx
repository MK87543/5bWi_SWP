import React, { useEffect, useState } from 'react'

type Props = {
    startValue: number
}

export default function Button({ startValue }: Props) {
    const [count, setCount] = useState<number>(startValue)
    console.log("direct", count);
    console.log("startval", startValue);


    useEffect(() => {
        console.log('useEffect triggered: startValue changed to', startValue);
        setCount(startValue);
    }, [startValue]);

    console.log('Rendering Button with count:', count, 'and startValue:', startValue);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', border: '1px solid black', padding: '10px', width: '100px' }}>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>
                Counter + 1
            </button>

        </div>



    )
}
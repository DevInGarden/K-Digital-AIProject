import React from 'react'
// import Allstat from './Allstat'
import Eachstat from './Eachstat'

export default function SMain() {
    return (
        <div className='h-screen w-full flex p-10'>
            <Eachstat />
            {/* <Allstat /> */}
        </div>
    )
}

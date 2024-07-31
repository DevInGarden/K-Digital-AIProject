import React from 'react'
import Header from '../../component/Header'
import Water from './Water'

export default function Pgrapf() {
    return (
        <div className='w-full h-screen flex flex-col overflow-y-hidden'>
            <div>
                <Header />
            </div>
                <Water />
        </div>
    )
}

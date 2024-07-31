import React from 'react'
import Header from '../../component/Header'
import SMain from './SMain'

export default function Stat() {
    return (
        <div className='w-full h-screen flex flex-col overflow-y-hidden'>
            <div>
                <Header />
            </div>
            <div className='flex'>
                <SMain />
            </div>
        </div>
    )
}

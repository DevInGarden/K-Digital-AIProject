import React from 'react'
import Header from '../../component/Header'
import EMain from './EMain'

export default function Elec() {
    return (
        <div className='w-full h-screen flex flex-col overflow-y-hidden'>
            <div>
                <Header />
            </div>
            <div className='flex'>
                <EMain />
            </div>
        </div>
    )
}
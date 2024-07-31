// import React from 'react'
// import Header from '../../component/Header'
// import All from './Allgraph'

// export default function AMain() {
//     return (
//         <div className='w-full h-screen flex flex-col overflow-y-hidden'>
//             <div>
//                 <Header />
//             </div>
//             <div className='h-screen w-full flex p-10 items-center'>
//                 <All />
//             </div>
//         </div>
//     )
// }
import React from 'react'
// import Allstat from './Allstat'
// import Eachstat from './Eachstat'
import Allgraph from './Allgraph'

export default function SMain() {
    return (
        <div className='h-screen w-full flex p-10'>
            <Allgraph />
        </div>
    )
}
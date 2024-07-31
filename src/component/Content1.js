import React from 'react';
import water from '../pic/water.jpg'
import water2 from '../pic/water2.jpg'
import water3 from '../pic/water3.jpg'
import elec from '../pic/elec.jpg'
import { useNavigate } from 'react-router-dom';

export default function Content1() {

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-2/5 h-full flex items-center justify-center" style={{ backgroundImage: `url(${water})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='flex flex-col h-1/3 mr-32 mb-60'>
                    <p className='text-blue-500 font-extrabold'>About Us</p>
                    <p className="text-3xl font-bold mt-3">최소한의 비용으로<br />용수를 공급해야 하기에<br /></p>
                    <p className='text-base font-semibold text-gray-700 mt-10'>야간 전기 요금 81원<br />주간 전기요금 107원</p>
                </div>
            </div>
            <div className='w-3/5 bg-gray-50 h-full flex items-center justify-center space-x-16'>
                <div className='w-1/4 h-1/2 mt-80 cursor-pointer' onClick={() => { navigate("/stat") }}>
                    <div className='w-full h-full overflow-hidden relative rounded-xl'>
                        <img
                            src={water3}
                            className='w-full h-full object-cover rounded-xl transform transition duration-1000 hover:scale-110'
                            alt="Water"
                        />
                        <div className='absolute inset-0 flex p-16 text-black text-xl font-bold pointer-events-none'>
                            Statistics
                        </div>
                    </div>
                </div>
                <div className='w-1/4 h-1/2 mb-80 cursor-pointer' onClick={() => { navigate("/elec") }}>
                    <div className='w-full h-full overflow-hidden relative rounded-xl'>
                        <img
                            src={elec}
                            className='w-full h-full object-cover rounded-xl transform transition duration-1000 hover:scale-110'
                            alt="Water"
                        />
                        <div className='absolute inset-0 flex p-16 text-black text-xl font-bold pointer-events-none'>
                            Electricity
                        </div>
                    </div>
                </div>
                <div className='w-1/4 h-1/2 cursor-pointer' onClick={() => { navigate("/manage") }}>
                    <div className='w-full h-full overflow-hidden relative rounded-xl'>
                        <img
                            src={water2}
                            className='w-full h-full object-cover rounded-xl transform transition duration-1000 hover:scale-110'
                            alt="Water"
                        />
                        <div className='absolute inset-0 flex p-16 text-black text-xl font-bold pointer-events-none'>
                            Management
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

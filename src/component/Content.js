import React from 'react';
import flow from '../pic/flow.mp4';
import { CiDesktopMouse2 } from "react-icons/ci";

export default function Content() {
    return (
        <div className="flex items-center justify-center h-full w-full relative">
            <div className='absolute inset-0'>
                <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
                    <source src={flow} type="video/mp4" />
                </video>
            </div>
            <div className="relative z-10 text-center text-black flex items-center justify-center h-full">
                <div className="text-center space-y-8">
                    <p className="text-8xl font-bold">H<sub>2</sub><span className='text-sky-400'>O</span>ptimizer</p>
                    <p className="text-3xl font-semibold">배수지의 수요를 <span className=''>예측</span>하여 전기료가 저렴한 새벽에 물을 가득 채우고<br /> 주간에는 필요한 만큼만 공급하여 전기료를 최적화합니다.</p>
                </div>
            </div>
            <div className="absolute bottom-5 w-full flex flex-col items-center animate-bounce font-semibold text-white">
                <CiDesktopMouse2 className="text-4xl mb-2" />
                <p className="text-lg">scroll</p>
            </div>
        </div>
    );
}

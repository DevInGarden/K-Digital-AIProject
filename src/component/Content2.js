import React, { useEffect, useState } from 'react';
import { FaGithub } from "react-icons/fa";
import water1 from '../pic/water1.jpg';

export default function Content2({ setSection }) {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = '전기 최적화로 비용 감소, 환경 보호까지 책임집니다.';

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) {
                setTimeout(() => {
                    index = 0;
                    setDisplayedText('');
                }, 2000);
            }
        }, 150);

        return () => clearInterval(typingInterval);
    }, []);

    const getStyledText = (text) => {
        const styledText = text.split('').map((char, index) => {
            let style = {};
            if ('비용감소'.includes(char)) {
                style = { color: 'red' };
            } else if ('환경보호'.includes(char)) {
                style = { color: 'green' };
            }
            return (
                <span key={index} style={style}>
                    {char}
                </span>
            );
        });
        return styledText;
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full relative" style={{ backgroundImage: `url(${water1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-white opacity-50"></div>
            <div className="text-center h-5/6 flex justify-center items-center relative z-10">
                <p className='text-4xl font-semibold'>
                    {getStyledText(displayedText)}
                </p>
            </div>
            <div className='h-1/6 bg-slate-900 w-full text-white justify-center items-center flex flex-col relative z-10'>
                <div className='flex flex-col items-center justify-center w-full'>
                    <a
                        href="https://github.com/everydayday/K-digital-project2"
                        target="_blank"
                    >
                        <FaGithub className="text-2xl text-white" />
                    </a>
                    <div className='w-full justify-center flex'>
                        <hr className="border-t border-gray-500 w-10/12" />
                    </div>
                    <p>ⓒ 2024 H<sub>2</sub>Optimizer. All right reserved.</p>
                </div>
                <div
                    className='absolute bottom-5 right-5 text-white font-bold flex items-center justify-center w-12 h-12 bg-blue-900 rounded-xl cursor-pointer hover:bg-blue-500 transition duration-300'
                    onClick={() => setSection(0)}
                >
                    Top
                </div>
            </div>
        </div >
    );
}

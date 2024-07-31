import React, { useState, useEffect } from 'react';
import Header from './Header';
import Content from './Content';
import Content1 from './Content1';
import Content2 from './Content2';

export default function Main() {
    const [section, setSection] = useState(0);
    const sections = [
        <Content key="content" />,
        <Content1 key="content1" />,
        <Content2 key="content2" setSection={setSection} />
    ];

    const handleScroll = (event) => {
        if (event.deltaY > 0) {
            setSection((prevSection) => Math.min(prevSection + 1, sections.length - 1));
        } else {
            setSection((prevSection) => Math.max(prevSection - 1, 0));
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);

    return (
        <div className="h-screen flex flex-col w-full">
            <Header />
            <div className="flex-1 w-full overflow-hidden relative">
                {sections.map((Section, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition transform duration-700 ${section === index ? 'transform translate-y-0' : section > index ? 'transform -translate-y-full' : 'transform translate-y-full'
                            }`}
                        style={{ height: '100%' }}
                    >
                        {Section}
                    </div>
                ))}
                <div className="absolute right-5 top-1/2 flex flex-col space-y-4">
                    {sections.map((_, index) => (
                        <div
                            key={index}
                            className={`w-4 h-4 rounded-full cursor-pointer border-2 ${section === index ? 'border-blue-500' : 'border-gray-300'}`}
                            onClick={() => setSection(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

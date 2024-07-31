import React, { useState, useRef, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Allstat() {
    const pdate = useRef();
    const [gra, setGra] = useState([]);
    const [fdate, setFdate] = useState(null);
    const [idata, setIdata] = useState([]);

    const handleChange = () => {
        const selectedDate = pdate.current.value;
        const formattedDate = selectedDate.replaceAll('-', '');
        setFdate(formattedDate);
    };

    useEffect(() => {
        if (fdate) {
            fetchData();
        }
        console.log("data", gra)
    }, [fdate]);

    const fetchData = async () => {
        const url = `http://10.125.121.225:8080/flowssum?date=${fdate}`;
        try {
            const resp = await fetch(url);
            if (resp.ok) {
                const data = await resp.json();
                if (Array.isArray(data)) {
                    setGra(data);
                } else {
                    console.error('Received data is not an array:', data);
                }
            } else {
                console.error('Failed to fetch data:', resp.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (gra.length > 0) {
            const inoutData = Object.keys(gra[0]).filter(key => key !== 'date').map(key => ({
                name: key,
                value: Math.round(gra[0][key], 1)
            }));
            setIdata(inoutData);
        }
    }, [gra]);

    return (
        <div className='w-1/2 flex h-screen'>
            <div className='flex flex-col w-full p-4'>
                <div className='flex justify-center space-x-4'>
                    <input type="date" min="2018-01-01" max="2022-12-31" className="border-2 border-gray-300 p-2 rounded-md shadow-md" ref={pdate} />
                    <button type="button" className="items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" onClick={handleChange}>검색</button>
                </div>
                <div className="w-full flex flex-col items-center mt-4">
                    <PieChart
                        series={[
                            {
                                data: idata,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        height={200}
                    />
                </div>
            </div>
        </div>
    );
}

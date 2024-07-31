import React, { useState, useEffect, useRef } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CiCalendar } from "react-icons/ci";
import ko from "date-fns/locale/ko";
import { registerLocale } from "react-datepicker";
import { VscGraph } from "react-icons/vsc";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MoonLoader } from 'react-spinners';
import Slide from './Slide';
import { FcFlashOn } from "react-icons/fc";

registerLocale("ko", ko);

export default function All() {
    const selwater = useRef();
    const [water, setWater] = useState('');
    const [sdata, setSdata] = useState([]);
    const [cal, setCal] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date("2019-10-20"));
    const [realsum, setRealSum] = useState();
    const [predsum, setPredSum] = useState();
    const [see, setSee] = useState(false);
    const [loading, setLoading] = useState(false);
    const [minheight, setMinHeight] = useState();
    const [maxheight, setMaxHeight] = useState();
    const [sliderValue, setSliderValue] = useState([20, 80]);

    const handleSliderChange = (value) => {
        setSliderValue(value);
    };

    const handleFetch = () => {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
        const day = selectedDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;
        setCal(formattedDate);

        const lowerwater = selwater.current.value.toLowerCase();
        setWater(lowerwater);

        const minValue = Math.min(...sliderValue) / 100;
        const maxValue = Math.max(...sliderValue) / 100;
        setMinHeight(minValue);
        setMaxHeight(maxValue);

        setSee(true);
    };

    useEffect(() => {
        if (cal && water && maxheight && minheight) {
            fetchData();
        }
    }, [cal, water, maxheight, minheight]);

    const fetchData = async () => {
        setLoading(true);
        const url = `http://10.125.121.225:5000/getRealAndPredictData?date=${cal}&jeosuji=${water}&percent=${maxheight}&safeheight=${minheight}`;
        console.log("url", url);

        try {
            const resp = await fetch(url);
            if (resp.ok) {
                const data = await resp.json();
                transformData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    };

    const transformData = (data) => {
        const realData = data[0];
        const predictData = data[1];
        const transformed = realData.map((real, index) => ({
            시간: index,
            실제전기료: real / 60,
            예측전기료: predictData[index] / 60,
        }));
        setSdata(transformed);

        const realSum = realData.reduce((sum, value) => sum + value, 0);
        const predSum = predictData.reduce((sum, value) => sum + value, 0);
        setRealSum(parseInt(realSum));
        setPredSum(parseInt(predSum));
    };

    const labels = Array.from({ length: 24 }, (_, hour) => `${hour.toString().padStart(2, '0')}:00시`);

    const CustomInput = ({ value, onClick }) => (
        <div className="flex items-center border-2 border-gray-300 p-2 rounded-md space-x-2 cursor-pointer" onClick={onClick}>
            <CiCalendar className="mr-2" />
            <span>{value}</span>
        </div>
    );

    return (
        <div className="w-full flex flex-col h-screen">
            <div className='flex flex-col items-center mb-4'>
                <div className="flex items-center mb-2">
                    <VscGraph className="text-2xl" />
                    <h1 className="text-2xl font-bold ml-2">전기료 시각화</h1>
                </div>
                <p className="text-center text-gray-700 mb-4">
                    이 그래프는 실제 전기료와 예측 전기료를 그래프로 시각화해서<br />
                    배수지의 전기료 차이를 알 수 있습니다.<br />날짜와 배수지, 최고수위와 최저수위를 선택하고 검색 버튼을 눌러 그래프를 확인하세요.
                </p>
                <div className='flex justify-center items-center space-x-4 mb-4'>
                    <div className='relative'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="yyyy-MM-dd"
                            locale="ko"
                            customInput={<CustomInput value={selectedDate.toLocaleDateString("ko-KR")} />}
                            minDate={new Date(2019, 9, 20)}
                            maxDate={new Date(2021, 7, 31)}
                            className='absolute'
                        />
                    </div>
                    <select className="border-2 border-gray-300 p-2 rounded-md shadow-md text-center w-20" ref={selwater}>
                        {[...Array(23)].map((_, i) => {
                            const letter = String.fromCharCode(65 + i);
                            return (
                                <option key={letter} value={letter} disabled={letter === 'D' || letter === 'K' || letter === 'R' || letter === 'C' || letter === 'W'}>
                                    {letter}
                                </option>
                            );
                        })}
                    </select>
                    <Slide onValueChange={handleSliderChange} />
                    <button type="button" className="items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" onClick={handleFetch}>검색</button>
                </div>
            </div>
            <div className="w-full h-1/2">
                {loading ? (
                    <div className="flex justify-center items-center h-full flex-col space-y-5">
                        <MoonLoader />
                        <p>전기료 예측중...</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={sdata}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 40,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="시간" tickFormatter={(tick) => labels[tick]} />
                            <YAxis />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} />
                            <Area type="monotone" dataKey="실제전기료" stroke="#1f77b4" fill="#1f77b4" strokeWidth={3} />
                            <Area type="monotone" dataKey="예측전기료" stroke="#ff7f0e" fill="#ff7f0e" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
            {see && !loading && (
                <div className='w-full flex justify-center items-center flex-col'>
                    <p className="text-gray-700 text-2xl font-semibold"><FcFlashOn className='inline text-3xl' />{Math.round((1 - predsum / realsum) * 10000) / 100}% 최적화</p>
                </div>
            )}
        </div>
    );
}

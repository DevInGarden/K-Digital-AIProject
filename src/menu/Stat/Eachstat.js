import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, ComposedChart, Label } from 'recharts';
import waterLevels from './maxwater';
import ko from "date-fns/locale/ko";
import map from '../../pic/map.svg';
import { getDaysInMonth } from 'date-fns';
import { registerLocale } from "react-datepicker";
import { CiCalendar } from "react-icons/ci";
import { LiaSitemapSolid } from "react-icons/lia";
import { BsGraphUp } from "react-icons/bs";
import { MoonLoader } from "react-spinners"

registerLocale("ko", ko);

const Eachstat = () => {
    const pwater = useRef();
    const [fdate, setFdate] = useState(null);
    const [fwater, setFwater] = useState(null);
    const [showimage, setShowimage] = useState(false);
    const [gra, setGra] = useState([]);
    const [idata, setIdata] = useState([]);
    const [hdata, setHdata] = useState([]);
    const [maxWaterLevel, setMaxWaterLevel] = useState(0);
    const [datePickerMode, setDatePickerMode] = useState('day');
    const [selectedDate, setSelectedDate] = useState(new Date("2018-01-01"));
    const [visibility, setVisibility] = useState({
        water: true,
        in_flow: true,
        out_flow: true
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = () => {
        const formattedDate = formatDate(selectedDate, datePickerMode);
        setFdate(formattedDate);

        const selectedWater = pwater.current.value.toLowerCase();
        setFwater(selectedWater);
        setMaxWaterLevel(waterLevels[selectedWater]);

        updateHdataLabels(datePickerMode, selectedDate);
    };

    const formatDate = (date, mode) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        if (mode === 'day') return `${year}${month}${day}`;
        if (mode === 'month') return `${year}${month}`;
        if (mode === 'year') return `${year}`;
        return `${year}${month}${day}`;
    };

    const updateHdataLabels = (mode, date) => {
        if (mode === 'day') {
            const labels = Array.from({ length: 24 }, (_, hour) => `${hour.toString().padStart(2, '0')}:00시`);
            setHdata(labels);
        } else if (mode === 'month') {
            const daysInMonth = getDaysInMonth(date);
            const labels = Array.from({ length: daysInMonth }, (_, day) => `${(day + 1).toString().padStart(2, '0')}일`);
            setHdata(labels);
        } else if (mode === 'year') {
            const labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
            setHdata(labels);
        }
    };

    useEffect(() => {
        if (fwater && fdate) {
            fetchData();
        }
    }, [fwater, fdate]);

    const fetchData = async () => {
        setIsLoading(true);
        let url;
        if (datePickerMode === 'day') {
            url = `http://10.125.121.225:8080/flowsbydate?date=${fdate}&jeosuji=${fwater}`;
        } else if (datePickerMode === 'month') {
            url = `http://10.125.121.225:8080/flowdailysumbymonth?yearmonth=${fdate}&jeosuji=${fwater}`;
        } else if (datePickerMode === 'year') {
            url = `http://10.125.121.225:8080/flowmonthlysumbyyear?year=${fdate}&jeosuji=${fwater}`;
        }

        try {
            const resp = await fetch(url);
            if (resp.ok) {
                const data = await resp.json();
                processFetchedData(data);
            } else {
                console.error('Failed to fetch data:', resp.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    const processFetchedData = (data) => {
        if (datePickerMode === 'day') {
            setGra(data);
        } else {
            const graArray = data.out_flow.map((out_flow, index) => ({
                in_flow: data.in_flow[index],
                out_flow: out_flow,
                height: data.height[index]
            }));
            setGra(graArray);
        }
    };

    useEffect(() => {
        if (!gra) return;
        console.log("data", gra);
    }, [gra]);

    useEffect(() => {
        if (gra.length > 0 && hdata.length > 0) {
            if (datePickerMode === 'day') {
                const inoutData = gra.map((item, index) => ({
                    hour: hdata[index],
                    in_flow: item.in_flow,
                    out_flow: item.out_flow,
                    water: item.height,
                }));
                setIdata(inoutData);
            } else if (datePickerMode === 'month') {
                const inoutData = gra.map((item, index) => ({
                    day: hdata[index],
                    in_flow: item.in_flow,
                    out_flow: item.out_flow,
                    water: item.height,
                }));
                setIdata(inoutData);
            } else if (datePickerMode === 'year') {
                const inoutData = gra.map((item, index) => ({
                    month: hdata[index],
                    in_flow: item.in_flow,
                    out_flow: item.out_flow,
                    water: item.height,
                }));
                setIdata(inoutData);
            }
        }
    }, [gra, hdata, datePickerMode]);

    const handleLegendClick = (dataKey) => {
        if (visibility[dataKey] && Object.values(visibility).filter(v => v).length === 1) {
            setVisibility({
                water: true,
                in_flow: true,
                out_flow: true
            });
        } else {
            setVisibility({
                water: dataKey === 'water',
                in_flow: dataKey === 'in_flow',
                out_flow: dataKey === 'out_flow'
            });
        }
    };

    const CustomInput = ({ value, onClick }) => (
        <div className="flex items-center border-2 border-gray-300 p-2 rounded-md h-12 w-[290px]">
            <div className='w-2/5 flex justify-center'>
                <button onClick={onClick} className="flex items-center">
                    <CiCalendar className="mr-2" />
                    <span>{value}</span>
                </button>
            </div>
            <div className='flex justify-center space-x-5 w-3/5'>
                <button onClick={() => setDatePickerMode('day')} className={`rounded- px-1 py-1 ml-2 text-xs font-semibold ${datePickerMode === 'day' ? ' text-black border-b-2 border-black' : ' text-gray-500 hover:border-b-2 hover:border-gray-400 hover:text-black'}`}>일별</button>
                <button onClick={() => setDatePickerMode('month')} className={`rounded- py-1 text-xs font-semibold ${datePickerMode === 'month' ? ' text-black border-b-2 border-black' : '  text-gray-500 hover:border-b-2 hover:border-gray-400 hover:text-black'}`}>월별</button>
                <button onClick={() => setDatePickerMode('year')} className={`rounded- py-1 text-xs font-semibold ${datePickerMode === 'year' ? ' text-black border-b-2 border-black' : '  text-gray-500 hover:border-b-2 hover:border-gray-400 hover:text-black'}`}>년도별</button>
            </div>
        </div>
    );

    const renderDatePicker = () => {
        switch (datePickerMode) {
            case 'month':
                return (
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM"
                        showMonthYearPicker
                        locale="ko"
                        customInput={<CustomInput />}
                        minDate={new Date(2018, 0, 1)}
                        maxDate={new Date(2022, 11, 31)}
                    />
                );
            case 'year':
                return (
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy"
                        showYearPicker
                        locale="ko"
                        customInput={<CustomInput />}
                        minDate={new Date(2018, 0, 1)}
                        maxDate={new Date(2022, 11, 31)}
                    />
                );
            case 'day':
            default:
                return (
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        locale="ko"
                        customInput={<CustomInput />}
                        minDate={new Date(2018, 0, 1)}
                        maxDate={new Date(2022, 11, 31)}
                    />
                );
        }
    };

    const toggleImage = () => {
        setShowimage(prevState => !prevState);
    };

    return (
        <div className='w-full flex flex-col h-screen'>
            <div className='flex flex-col items-center mb-4'>
                <div className="flex items-center mb-2">
                    <BsGraphUp className="text-2xl" />
                    <h1 className="text-2xl font-bold ml-2">수위, 유출유량, 유입유량 시각화</h1>
                </div>
                <p className="text-center text-gray-700 mb-4">
                    이 그래프는 선택한 년, 월, 일에 대한 수위, 유출유량, 유입유량 데이터를 시각화한 것입니다.<br />
                    날짜와 배수지를 선택하고 검색 버튼을 눌러 그래프를 확인하세요.
                </p>
                <div className="relative flex items-center space-x-4">
                    <LiaSitemapSolid className='w-10 h-10 cursor-pointer animate-pulse' onClick={toggleImage} />
                    <span>클릭하면 도식도를 볼 수 있습니다.</span>
                </div>
                {showimage && <img src={map} className='w-full h-1/2 flex justify-center items-center mt-4' />}
            </div>
            <div className='relative flex justify-center space-x-4 mb-4 w-full'>
                <div className='relative'>
                    {renderDatePicker()}
                </div>
                <select className="border-2 border-gray-300 p-2 rounded-md shadow-md text-center w-20" ref={pwater}>
                    {[...Array(23)].map((_, i) => {
                        const letter = String.fromCharCode(65 + i);
                        return (
                            <option key={letter} value={letter} disabled={letter === 'D' || letter === 'K' || letter === 'R' || letter === 'C' || letter === 'W'}>
                                {letter}
                            </option>
                        );
                    })}
                </select>
                <button type="button" className="items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500" onClick={handleChange}>검색</button>
            </div>
            <div className="w-full h-1/2">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full flex-col space-y-5">
                        <MoonLoader />
                        <p>로딩중...</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={idata}
                            margin={{
                                left: 30,
                            }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis key={datePickerMode} dataKey={datePickerMode === 'day' ? "hour" : (datePickerMode === 'month' ? "day" : "month")} tick={{ fontSize: 15 }} tickFormatter={(value) => value} />
                            <YAxis yAxisId="left">
                                <Label value="유량" offset={15} position="top" />
                            </YAxis>
                            {visibility.water && (
                                <YAxis yAxisId="right" orientation="right" domain={[0, maxWaterLevel]}>
                                    <Label value="수위" offset={15} position="top" />
                                </YAxis>
                            )}
                            <Tooltip />
                            <Legend verticalAlign="top" height={40} onClick={(e) => handleLegendClick(e.dataKey)} />
                            {visibility.water && <Bar dataKey="water" barSize="40" fill="#53CD92" yAxisId="right" name="수위" />}
                            {visibility.in_flow && <Line type="monotone" dataKey="in_flow" stroke="#f08080" yAxisId="left" name="유입유량" strokeWidth={2.5} />}
                            {visibility.out_flow && <Line type="monotone" dataKey="out_flow" stroke="#4169e1" yAxisId="left" name="유출유량" strokeWidth={2.5} />}
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Eachstat;

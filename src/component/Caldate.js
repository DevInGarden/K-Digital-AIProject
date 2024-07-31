import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GrPowerReset } from "react-icons/gr";
import { sdate } from '../RecoilAtom';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';

const Caldate = () => {
    const [startDate, setStartDate] = useState(null);
    const [seldate, setSdate] = useRecoilState(sdate);
    const rseldate = useRecoilValue(sdate)

    const handleResetDate = () => {
        setStartDate(null);
    };

    const handleChangeDate = (date) => {
        if (date) {
            const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
            setStartDate(formattedDate);
        } else {
            setStartDate(null);
        }
    };

    useEffect(() => {
        setSdate(startDate);
    }, [startDate]);

    const formattedStartDate = startDate ? `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}` : null;

    return (
        <div className="relative">
            <DatePicker
                selected={formattedStartDate ? new Date(formattedStartDate) : null}
                onChange={date => handleChangeDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-2/3 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-start"
                placeholderText="날짜 선택"
                minDate={new Date("2018-01-01")}
                maxDate={new Date("2022-12-31")}
                openToDate={formattedStartDate}
            />
            <GrPowerReset className="absolute right-20 top-3.5 h-4 w-4 cursor-pointer text-gray-400" onClick={handleResetDate} />
        </div>
    );
};

export default Caldate;

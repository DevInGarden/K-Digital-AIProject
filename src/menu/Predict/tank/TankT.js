import React, { useState, useEffect } from 'react';
import { Handle } from 'reactflow';
import { useRecoilValue } from 'recoil';
import { num } from '../../../RecoilAtom';

const TankT = ({ data, id }) => {
    const [filledHeight, setFilledHeight] = useState(0);
    const rid = useRecoilValue(num);

    useEffect(() => {
        const percentage = (data.amount / data.max) * 100;
        const newFilledHeight = (percentage / 100) * 60;
        setFilledHeight(newFilledHeight);
    }, [data.amount, data.max]);

    return (
        <>
            <div
                className={`${id !== rid && 'hover:bg-gray-200 transition duration-500 ease-in-out border'}`}
                style={{
                    position: 'relative',
                    width: 60,
                    height: 60,
                    borderBottomLeftRadius: '10%',
                    borderBottomRightRadius: '10%',
                    borderBottom: '1px solid black',
                    borderLeft: '1px solid black',
                    borderRight: '1px solid black',
                    borderTop: 'none',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}>
                <div style={{
                    width: '100%',
                    height: filledHeight,
                    backgroundColor: '#00FFE0',
                    transition: 'height 0.5s ease',
                }}></div>
                <div style={{
                    position: 'absolute',
                    textAlign: 'center',
                    width: '100%',
                    height: '100%',
                    fontSize: 13,
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                }}>
                    {data.label}
                </div>
                <Handle type={data.T} position="top" style={{ background: "white" }} />
            </div>
            {!["44", "21", "52", "29", "69"].includes(id) &&
                <div className='flex justify-center text-sm'>
                    {data.amount} / {data.max}
                </div>
            }
            {["44", "21", "52", "29", "69"].includes(id) &&
                <div className='flex justify-center'>
                    
                </div>
            }
        </>
    );
};

export default TankT;

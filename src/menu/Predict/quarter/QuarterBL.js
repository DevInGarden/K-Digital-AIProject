import React from 'react';
import { Handle } from 'reactflow';

const QuarterBL = ({ data }) => {
    return (
        <div style={{
            backgroundColor: '#FEF3BD',
            color: 'black',
            borderRadius: '10%',
            width: 60,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid black',
            fontSize:12,
            fontWeight : 'bold'
        }}>
            {data.label}
            <Handle type={data.L} position="left" />
            <Handle type={data.B} position="bottom" />
        </div>
    );
};

export default QuarterBL;

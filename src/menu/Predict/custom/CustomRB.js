import React from 'react';
import { Handle } from 'reactflow';

const CustomRB = ({ data }) => {
    return (
        <div style={{
            backgroundColor: '#C0C0C0',
            color: 'black',
            borderRadius: '50%',
            width: 30,
            height: 30,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid black',
            fontWeight : 'bold'
        }}>
            F
            <Handle type={data.B} position="bottom" />
            <Handle type={data.R} position="right" />
        </div>
    );
};

export default CustomRB;
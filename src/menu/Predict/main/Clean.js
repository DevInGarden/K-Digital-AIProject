import React from 'react';
import { Handle } from 'reactflow';

const Clean = ({ data }) => {
    return (
        <div style={{
            backgroundColor: '#00FFE0',
            color: 'black',
            borderRadius: '10%',
            width: 100,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid black',
            fontSize: 20,
            fontWeight: 'bold'
        }}>
            {data.label}
            <Handle type={data.B} position="bottom" />
        </div>
    );
};

export default Clean;
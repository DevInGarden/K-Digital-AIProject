import React, { useState } from 'react';
import { RangeSlider, Row, Col } from 'rsuite';
import 'rsuite/dist/rsuite.css';

const Slide = ({ onValueChange }) => {
    const [value, setValue] = useState([10, 100]);
    const style = { width: 300 };

    const handleSliderChange = (value) => {
        setValue(value);
        onValueChange(value);
    };

    const renderMark = (mark) => {
        return <span>{mark}</span>;
    };

    return (
        <Row className="flex">
            <Col>
                <div className='flex justify-between'>
                    <div>최저수위</div>
                    <div>최고수위</div>
                </div>
                <div style={style} className="mt-4">
                    <RangeSlider
                        min={10}
                        step={10}
                        max={100}
                        defaultValue={[20, 80]}
                        value={value}
                        onChange={handleSliderChange}
                        graduated
                        renderMark={renderMark}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default Slide;

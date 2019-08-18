import React from "react";
import { Field } from "../Field";
import { Radar } from "../Radar";
import './index.css';

const MapComponent = ({ map, handleClick }) => {
    if (!map) {
        return <Radar />;
    }

    return (
        <div className="Map">
            {map.map((row, i) => (
                <div key={`row${i}`} className='Map-row'>
                    {row.map((data, j) => (
                        <Field
                            key={`field${i}${j}`}
                            data={data}
                            handleClick={handleClick(`open ${j} ${i}`)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export const Map = React.memo(MapComponent);
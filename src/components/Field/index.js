import React from 'react';
import './index.css';

function FieldComponent({data, handleClick}) {
    return (
        <button
            className="Field"
            disabled={data !== '□'}
            style={{backgroundColor: data === '*' ? 'red' : data !== '□' ? 'green' : undefined}}
            onClick={handleClick}
        >{data}
        </button>
    );
}

export const Field = React.memo(FieldComponent);
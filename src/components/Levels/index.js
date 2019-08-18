import React from 'react';
import './index.css';

function LevelsComponent({ chooseLevel }) {
    return (
        <div className="Levels">
            <div className="Levels-container">
                <div className="Levels-button" onClick={chooseLevel(1)}>Level 1</div>
                <div className="Levels-button" onClick={chooseLevel(2)}>Level 2</div>
                <div className="Levels-button" onClick={chooseLevel(3)}>Level 3</div>
                <div className="Levels-button" onClick={chooseLevel(4)}>Level 4</div>
            </div>
        </div>
    );
}

export const Levels = React.memo(LevelsComponent)
import React from 'react';
import io from 'socket.io-client';
import {Map} from './../Map';
import {Levels} from './../Levels';
import './index.css';

// eslint-disable-next-line no-restricted-globals
const socket = io(`${location.protocol}//${location.hostname}:${process.env.REACT_APP_SOCKET_PORT}`);

[
    'connect',
    'connect_error',
    'connect_timeout',
    'reconnect',
    'reconnecting',
    'reconnect_error',
    'reconnect_failed'
].forEach((ev) =>
    socket.on(ev, () => console.log(ev)),
);

socket.on('close', () => console.log('CLOSE'));

export function Root() {
    const [map, setMap] = React.useState(undefined);
    const [level, setLevel] = React.useState(undefined);
    const [status, setStatus] = React.useState('play');

    const createCommand = React.useCallback((action) => () => {
        if (action.indexOf('new') !== -1) {
            setStatus('play');
        }
        if (action.indexOf('open') !== -1 && status === 'lose') {
            return;
        }
        socket.emit('action', action);
    }, [status]);

    React.useEffect(() => {
        socket.on('response', (response) => {
            switch (response.type) {
                case 'map':
                    setMap(response.data);
                    return;
                case 'gameOver':
                    setStatus('lose');
                    return;
                default:
                    return;
            }
        });
    }, [createCommand]);

    const restartLevel = React.useCallback(() => {
        setMap(undefined);
        setLevel(undefined);
    }, []);

    const chooseLevel = React.useCallback((level) => {
        return () => {
            setLevel(level);
            createCommand(`new ${level}`)();
        };
    }, [createCommand]);

    return (
        <div className="Root">
            <div className="Root-container">
                {!level &&
                  <Levels chooseLevel={chooseLevel}/>
                }
                {!!level &&
                <>
                    <div className="Root-mapContainer">
                        <Map map={map} handleClick={createCommand}/>
                    </div>
                  <br/>
                  <div>{status === 'lose' && 'You lose!'}</div>
                  <br/>
                    <div>
                        <button className="Root-button" onClick={chooseLevel(level)}>Restart</button>
                        <button className="Root-button" onClick={restartLevel}>Change Level</button>
                    </div>
                </>
                }
            </div>
        </div>
    );
}

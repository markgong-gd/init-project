import React from 'react';

import './index.less';
import helloWorld from './images/hello_world.png';

export default function App() {
    return (
        <div className="app">
            hello world
            <img src={helloWorld} alt="hello world" />
        </div>
    );
}
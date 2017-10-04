import React from 'react';

export default ({items = []})=>(
    <div>
        <h1>React Application</h1>
        <p>
            <code>{items.length}</code> New Questions!
        </p>
    </div>
)
// /src/components/index.js

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => (<div id='App'><h1>Hello, World</h1></div>);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

export { default as Header } from './Header';
export { default as UserPosts } from './UserPosts';
export { default as UserTodos } from './UserTodos'
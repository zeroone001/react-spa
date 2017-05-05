import React, {
    Component
} from 'react';

import {
    HashRouter as Router,
    Route,
    NavLink,
    Redirect
} from 'react-router-dom'

import Author from '_/components/author'
import Category from '_/components/category'
import Book from '_/components/book'


import '_/styles/index.scss';
import _header from '_/styles/header.scss';



function App() {
    return (
        <Router>
            <div className={_header.container}>
                React Example
            </div>
            <div>
                <Link to="/author" >zuozhe</Link>
                <Link to="/category">分类</Link>
                <Link to="/book">书籍</Link>
            </div>
            <div>
                <Route path="/author" component={Author} />
            </div>
        </Router>
    )
}

export default App;
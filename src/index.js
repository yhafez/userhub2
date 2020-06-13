// /src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import { Header, UserPosts, UserTodos } from './components';
import { getUsers, getPostsByUser, getTodosByUser } from './api';
import { getCurrentUser } from './auth';


const App = () => {

    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    const [userPosts, setUserPosts] = useState([]);
    const [userTodos, setUserTodos] = useState([]);

    useEffect(() => {
        getUsers()
            .then(users => {
                setUserList(users)
            })
            .catch(err => console.error("There's been an error getting and setting user list @ /src/index.js. Error: ", err));
    }, []);

    useEffect(() => {

        if(!currentUser) {
            setUserPosts([]);
            setUserTodos([]);
            return;
        }
    
        getPostsByUser(currentUser.id)
            .then(posts => setUserPosts(posts))
            .catch(err => console.error("There's been an error getting and setting posts by user @ /src/index.js. Error: ", err));

        getTodosByUser(currentUser.id)
            .then(todos => setUserTodos(todos))
            .catch(err => console.error("There's been an error getting and setting todos by user @ /src/index.js. Error: ", err));
    }, [currentUser]);

    return(
        <Router>
            <div id="App">
                <Header
                userList={ userList }
                currentUser={ currentUser }
                setCurrentUser={ setCurrentUser } />
                {
                    currentUser
                    ?
                        <>
                            <Switch>

                                <Route path="/posts">
                                    <UserPosts
                                        userPosts={ userPosts }
                                        currentUser={ currentUser } />
                                </Route>

                                <Route path="/todos">
                                    <UserTodos 
                                        userTodos={ userTodos }
                                        currentUser={ currentUser } />
                                </Route>

                                <Route exact path="/">
                                    <h2 style={{
                                        padding: ".5em"
                                    }}> Welcome, { currentUser.username }</h2>
                                </Route>

                                <Redirect to="/" />

                            </Switch>
                        </>
                    :
                        <>
                            <Switch>
                                <Route exact path="/">
                                    <h2 style={{
                                        padding: ".5em"
                                    }}>Please log in, above</h2>
                                </Route>
                            </Switch>
                        </>
                }
            </div>
        </Router>
    );

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
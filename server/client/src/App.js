import React, { Fragment } from "react";
import "./App.css";

//components

import BookTodo from "./components/BookTodo";
import ListTodos from "./components/ListTodos";
import ClerkSide from "./components/ClerkSide";

function App() {
    return (
    <Fragment>
        <div className="container">
        <ListTodos />
        <BookTodo />
        <ClerkSide />
        </div>
    </Fragment>
    );
};

export default App;
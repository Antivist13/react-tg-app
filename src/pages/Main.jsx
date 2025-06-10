import React from 'react';
import TodoList from "../components/list/TodoList";

function Main() {
    return (
        <div className="main">
            <div className="main__container">
                <TodoList/>
            </div>
        </div>
    );
}
export default Main;
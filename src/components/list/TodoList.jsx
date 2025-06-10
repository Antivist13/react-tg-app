import React, {useEffect, useState} from 'react';
import classes from "./TodoList.module.css";
import TodoItem from "../item/TodoItem";
import todoService from "../../services/todo.service";

const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    async function getTodoItems() {
        const todos =  await todoService.getAllTodo();
        setTodoItems(todos);
    }
    useEffect(() => {
        getTodoItems();
    }, []);
    return (
        <div className={classes.list}>
            <h2 className={classes.title}>Todo - List</h2>
            {
                todoItems.map(todo => {
                    return <TodoItem id={todo.id} text={todo.title} key={todo.id}/>
                })
            }
        </div>
    );
};

export default TodoList;
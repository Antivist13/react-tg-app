import React, {useEffect, useState} from 'react';
import classes from "./TodoList.module.css";
import TodoItem from "../item/TodoItem";
import todoService from "../../services/todo.service";

const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    // const [newTodo, setNewTodo] = useState({id: '', title: ''});

    function removeTodo(todo) {
        setTodoItems(
            todoItems.filter(todoItem => {
                return todoItem.id !== todo.id
            })
        );
    }

    async function getTodoItems() {
        return await todoService.getAllTodo();
    }

    useEffect(() => {
        getTodoItems()
            .then(todos => {
                if (todos) {
                    setTodoItems(todos);
                }
            });
    }, []);

    return (
        <div className={classes.list}>
            <h2 className={classes.title}>Todo - List</h2>
            {
                todoItems.map((todo, index) => {
                    return <TodoItem
                        remove={removeTodo}
                        number={index + 1}
                        todo={todo}
                        key={todo.id}
                    />
                })
            }
        </div>
    );
};

export default TodoList;
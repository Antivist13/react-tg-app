import React, {useContext, useEffect, useState} from 'react';
import classes from "./TodoList.module.css";
import TodoItem from "../item/TodoItem";
import todoService from "../../services/todo.service";
import {ModalContext} from "../context";
import Modal from "../../UI/modal/Modal";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import Form from "../form/Form";

const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [todoItem, setTodoItem] = useState({})
    // const [newTodo, setNewTodo] = useState({id: '', title: ''});
    const [inputValue, setInputValue] = useState("");
    const [modalVisible, setModalVisible] = useContext(ModalContext);

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

    function openEditModal(todo) {
        setModalVisible(true);
        setTodoItem(todo);
        setInputValue(todo.title);
    }

    const getInputValue = (currentValue) => {
        setInputValue(currentValue);
    }

    const submitModal = (e, type) => {
        e.preventDefault();
        setModalVisible(false);
        let updateTodoItems = todoItems.map(todo => {
            return todo.id === todoItem.id
                ? {...todo, title: inputValue}
                : todo
        });

        if (type === "create") {

        }

        setTodoItems(updateTodoItems)
    }

    return (
        <div className={classes.list}>
            <h2 className={classes.title}>Todo - List</h2>
            {
                todoItems.map((todo, index) => {
                    return <TodoItem
                        remove={removeTodo}
                        edit={openEditModal}
                        number={index + 1}
                        todo={todo}
                        key={todo.id}
                    />
                })
            }
            <Modal>
                <Form
                    type={"edit"}
                    inputValue={inputValue}
                    getInputValue={getInputValue}
                    submit={submitModal}
                />
            </Modal>
        </div>
    );
};

export default TodoList;
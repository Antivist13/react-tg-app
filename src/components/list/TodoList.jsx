import React, {useContext, useEffect, useState} from 'react';
import classes from "./TodoList.module.css";
import TodoItem from "../item/TodoItem";
import todoService from "../../services/todo.service";
import {ModalContext} from "../context";
import Modal from "../../UI/modal/Modal";
import Button from "../../UI/button/Button";
import Form from "../form/Form";

const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [todoItem, setTodoItem] = useState({});
    const [typeModal, setTypeModal] = useState('');
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

    function openModal(type, todo = null) {
        setModalVisible(true);
        setTypeModal(type);
        setInputValue('');
        if (type === 'edit') {
            setTodoItem(todo);
            setInputValue(todo.title);
        }
    }

    const getInputValue = (currentValue) => {
        setInputValue(currentValue);
    }

    const submitModal = (e, type) => {
        cancel(e);
        let updateTodoItems = todoItems.map(todo => {
            return todo.id === todoItem.id
                ? {...todo, title: inputValue}
                : todo
        });

        if (type === "create") {
            updateTodoItems = [...todoItems, {
                id: todoItems[todoItems.length - 1].id + 1,
                title: inputValue,
            }]
        }

        setTodoItems(updateTodoItems);
    }

    const cancel = (e) => {
        e.preventDefault();
        setModalVisible(false);
    }

    return (
        <div className={classes.list}>
            <h2 className={classes.title}>Todo - List</h2>
            <Button onClick={() => openModal("create")} children={"Создать"}/>
            {
                todoItems.map((todo, index) => {
                    return <TodoItem
                        remove={removeTodo}
                        edit={openModal}
                        number={index + 1}
                        todo={todo}
                        key={todo.id}
                    />
                })
            }
            <Modal>
                <Form
                    type={typeModal}
                    inputValue={inputValue}
                    getInputValue={getInputValue}
                    submit={submitModal}
                    cancel={cancel}
                />
            </Modal>
        </div>
    );
};

export default TodoList;
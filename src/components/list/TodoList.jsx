import {useContext, useEffect, useState} from 'react';
import classes from "./TodoList.module.css";
import TodoItem from "../item/TodoItem";
import todoService from "../../services/todo.service";
import {ModalContext} from "../context";
import Modal from "../../UI/modal/Modal";
import Form from "../form/Form";
import Header from '../header/Header';

const TodoList = () => {
    const [todoItems, setTodoItems] = useState([]);
    const [todoItem, setTodoItem] = useState({});
    const [typeModal, setTypeModal] = useState('');
    const [inputValue, setInputValue] = useState("");
    const [sortedTodoItems, setSortedTodoItems] = useState([]);
    const [modalVisible, setModalVisible] = useContext(ModalContext);

    async function getTodoItems() {
        return await todoService.getAllTodo();
    }

    useEffect(() => {
        getTodoItems()
            .then(todos => {
                if (todos) {
                    setTodoItems(todos);
                    setSortedTodoItems(todos);
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

    function removeTodo(todo) {
        setTodoItems(
            sortedTodoItems.filter(todoItem => {
                return todoItem.id !== todo.id
            })
        );
    }

    const submitModal = (e, type) => {
        cancel(e);
        let updateTodoItems = sortedTodoItems.map(todo => {
            return todo.id === todoItem.id
                ? {...todo, title: inputValue}
                : todo
        });

        if (type === "create") {
            updateTodoItems = [...sortedTodoItems, {
                id: sortedTodoItems[sortedTodoItems.length - 1].id + 1,
                title: inputValue,
            }]
        }

        setTodoItems(updateTodoItems);
    }

    const cancel = (e) => {
        e.preventDefault();
        setModalVisible(false);
    }

    const search = (value) => {
        if (!value) {
            setSortedTodoItems(todoItems);
        }

        const sortedTodos = [...todoItems].filter(todo => {
            if (todo.title.includes(value)) {
                return todo;
            }
        });
        setSortedTodoItems(sortedTodos);
    }

    return (
        <div className={classes.list}>   
            <Header
                create={openModal}
                search={search}
            >
            </Header>
            {
                sortedTodoItems.map((todo, index) => {
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
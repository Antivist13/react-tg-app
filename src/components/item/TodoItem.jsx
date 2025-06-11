import React, {useState} from 'react';
import Button from "../../UI/button/Button";
import classes from "./TodoItem.module.css";
import Input from "../../UI/input/Input";

const TodoItem = (props) => {
    return (
        <div className={classes.item}>
            <div className={classes.item__container}>
                <strong className="item__number">{props.number} </strong>
                {
                   <span className="item__text">{props.todo.title}</span>
                }
            </div>
            <Button onClick={() => props.remove(props.todo)}>Удалить</Button>
            <Button onClick={() => props.edit(props.todo)}>Изменить</Button>
        </div>
    );
};

export default TodoItem;
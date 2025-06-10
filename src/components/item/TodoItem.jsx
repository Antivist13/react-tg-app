import React from 'react';
import Button from "../../UI/button/Button";
import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
    return (
        <div className={classes.item}>
            <div className={classes.item__container}>
                <strong className="item__number">{props.id}. </strong>
                <span className="item__text">{props.title}</span>
            </div>
            <Button>Удалить</Button>
        </div>
    );
};

export default TodoItem;
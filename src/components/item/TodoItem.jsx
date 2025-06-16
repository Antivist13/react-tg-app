import { useState } from "react";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import classes from "./TodoItem.module.css";

const TodoItem = (props) => {
    
    const rootClasses = [classes.text];
    const [todoState, setTodoState] = useState(false);

    function changeState(value) {
        setTodoState(value);
    }

    if (todoState) {
        rootClasses.push(classes.done);
    }
    return (
        <div className={classes.item}>
            <div className={classes.item__container}>
                <Input className={classes.input} type="checkbox" onChange={(e) => changeState(e.target.checked)} />
                <span className={rootClasses.join(' ')}>{props.todo.title}</span>
            </div>
            <div className={classes.buttons}>
                <Button onClick={() => props.remove(props.todo)}>Удалить</Button>
                <Button onClick={() => props.edit("edit", props.todo)}>Изменить</Button>
            </div>
        </div>
    );
};

export default TodoItem;
import React, {useContext, useState} from 'react';
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import {ModalContext} from "../context";

const Form = (props) => {
    const [modalVisible, setModalVisible] = useContext(ModalContext);

    const cancel = (e) => {
        e.preventDefault();
        setModalVisible(false);
    }

    return (
        <form>
            <Input
                type="text"
                placeholder="Текст тудушки"
                value={props.inputValue}
                onChange={(e) => props.getInputValue(e.target.value)} />
            <Button onClick={(e) => props.submit(e, props.type)}>
                {
                    props.type === "create"
                    ? "Создать"
                    : "Изменить"
                }
            </Button>
            <Button onClick={(e) => cancel(e)}>Отменить</Button>
        </form>
    );
};

export default Form;
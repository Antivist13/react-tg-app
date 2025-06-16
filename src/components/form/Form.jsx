import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import clases from './Form.module.css'

const Form = (props) => {
    return (
        <form className={clases.form}>
            <Input
                type="text"
                placeholder="Текст тудушки"
                value={props.inputValue}
                onChange={(e) => props.getInputValue(e.target.value)} />
            <Button className={clases.submit} onClick={(e) => props.submit(e, props.type)}>
                {
                    props.type === "create"
                    ? "Создать"
                    : "Изменить"
                }
            </Button>
            <Button className={clases.cancel} onClick={(e) => props.cancel(e)}>Отменить</Button>
        </form>
    );
};

export default Form;
import axios from "axios";
import {TODO_API} from "../API/todo.api";

export default class TodoService {
    static async getAllTodo() {
        try {
            return (await axios.get(TODO_API)).data;
        }
        catch (error) {
            console.log(error);
        }
    }
}
import React, {useState} from 'react';
import TodoList from "../components/list/TodoList";
import {ModalContext} from "../components/context";

function Main() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
            <div className="main">
                <div className="main__container">
                    <ModalContext.Provider value={[modalVisible, setModalVisible]}>
                        <TodoList/>
                    </ModalContext.Provider>
                </div>
            </div>
    );
}
export default Main;
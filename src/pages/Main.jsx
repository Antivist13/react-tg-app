import React, {useContext, useState} from 'react';
import TodoList from "../components/list/TodoList";
import Modal from "../UI/modal/Modal";
import Form from "../components/form/Form";
import {ModalContext} from "../components/context";

function Main() {
    const [modalVisible, setModalVisible] = useState(false);
    const getInputValue = (e) => {

    }
    return (
            <div className="main">
                <div className="main__container">
                    <ModalContext.Provider value={[modalVisible, setModalVisible]}>
                        <Modal>
                            <Form
                                type={"create"}
                                getInputValue={getInputValue}
                            />
                        </Modal>
                        <TodoList/>
                    </ModalContext.Provider>
                </div>
            </div>
    );
}
export default Main;
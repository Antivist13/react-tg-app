import {useContext, useEffect, useState} from 'react';
import TodoList from "../../components/list/TodoList";
import {AuthContext, ModalContext} from "../../components/context";
import { useNavigate } from 'react-router-dom';

function Main() {
    const [modalVisible, setModalVisible] = useState(false);
    const [authState, setAuthState] = useContext(AuthContext);
    const state = JSON.parse(localStorage.getItem('authState'));
    const nav = useNavigate();

    useEffect(() => {
        if (!state) {
            setAuthState(false);
            nav('/auth');
        } else {
            setAuthState(true);
        }
    }, []);
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
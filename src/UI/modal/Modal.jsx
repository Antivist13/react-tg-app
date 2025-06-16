import {useContext} from 'react';
import classes from "./Modal.module.css";
import {ModalContext} from "../../components/context";

const Modal = ({children, ...props}) => {
    const rootClasses = [classes.modal];
    const [modalVisible, setModalVisible] = useContext(ModalContext);
    
    if (modalVisible) {
        rootClasses.push(classes.active);
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    
    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
import { Component } from "react";
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.closeByEsc);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeByEsc);
    }

    closeByEsc = event => {
        if (event.code !== 'Escape') {
            return;
        }
        this.props.closeModal();
    };

    render() {
        const { closeModal, tags, modalImg } = this.props;

        return createPortal(
            <div className={css.overlay}
                onClick={closeModal}>
                <div className={css.modalViewer}>
                    <img className={css.modalImg}
                        src={modalImg} alt={tags} />
                </div>
            </div>,
            modalRoot
        );

    };
}
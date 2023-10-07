import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#root');

export const Modal = ({ closeModal, tags, modalImg }) => {

    useEffect(() => {
        const closeByEsc = event => {
            if (event.code !== 'Escape') {
                return;
            }
            closeModal();
        };

        window.addEventListener('keydown', closeByEsc);

        return () => {
            window.removeEventListener('keydown', closeByEsc);
          };
    }, [closeModal]);


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
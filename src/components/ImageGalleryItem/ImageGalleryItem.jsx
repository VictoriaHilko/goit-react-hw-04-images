import { Modal } from "components/Modal/Modal";
import css from './ImageGalleryItem.module.css';
import { useState } from "react";

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL } ) => {

    // state = { isModalOpen: false };

    const [isModalOpen, setisModalOpen] = useState(false);

    const toggleModal = () => {
        setisModalOpen((prevState) => !prevState);
    };

        return (
            <li className={css.galleryItem}>
                <img
                    src={webformatURL}
                    alt={tags}
                    width="500"
                    height="200"
                    loading="lazy"
                    onClick={toggleModal}
                />
                {isModalOpen && (
                    <Modal
                        modalImg={largeImageURL}
                        tags={tags}
                        closeModal={toggleModal}
                    />
                )}
            </li>
        );
    }

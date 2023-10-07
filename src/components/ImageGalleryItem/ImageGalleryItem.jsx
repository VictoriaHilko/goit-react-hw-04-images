import { Modal } from "components/Modal/Modal";
import { Component } from "react";
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {

    state = { isModalOpen: false };

    toggleModal = () => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }));
    };

    render() {

        const { webformatURL, tags, largeImageURL } = this.props;
        const { isModalOpen } = this.state;
        const { toggleModal } = this;

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
}
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images }) => {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                return (
                    <ImageGalleryItem
                        key={id}
                        webformatURL={webformatURL}
                        largeImageURL={largeImageURL}
                        tags={tags}>
                    </ImageGalleryItem>
                );
            })}
        </ul>
    );
};
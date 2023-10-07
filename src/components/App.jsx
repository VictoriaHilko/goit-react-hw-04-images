import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchImages } from "utils/pixabay-api";
import { Notify } from "notiflix";
import { Loader } from "./Loader/Loader";
import { useEffect, useState } from "react";

export const App = () => {


  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);
    setLoadMore(false);

    const fetchData = async () => {
      const { hits, totalHits } = await fetchImages(query, page);

      if (totalHits === 0) {
        Notify.error('Nothing was found for your request');
        setIsLoading(false);
        setLoadMore(false);
        return;
      }

      

      setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
      setTotalHits(prevTotalHits =>
        page === 1 ? totalHits - hits.length : prevTotalHits - hits.length
        
      );
      setIsLoading(false);
      setLoadMore(true);
    };

    fetchData().catch(error => {
      Notify.error(`Oops! Something went wrong! ${error}`);
      setIsLoading(false);
    });
  }, [page, query]);



const onSubmit = (query) => {
  setQuery(query);
  setPage(1);
  setImages([]);

  if (query === '') {
    setIsLoading(false);
    setLoadMore(false);
    return;
  }
}

const handleLoadMore = () => {
  setPage(prevPage => prevPage + 1);
  setLoadMore(false);
};


return (
  <>
    <Searchbar onSubmit={onSubmit} />
    {images.length !== 0 && <ImageGallery images={images} />}
    {loadMore && <Button onLoadMore={handleLoadMore} />}
    {isLoading && <Loader />}
  </>
);
}


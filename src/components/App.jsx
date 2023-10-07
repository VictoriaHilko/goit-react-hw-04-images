import { Component } from "react"
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { fetchImages } from "utils/pixabay-api";
import { Notify } from "notiflix";
import { Loader } from "./Loader/Loader";

export class App extends Component {

  state = {
    query: '',
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    loadMore: false
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({
          isLoading: true,
          loadMore: false
        });

        const { totalHits, hits } = await fetchImages(query, page);

        if (totalHits === 0) {
          Notify.failure('Nothing was found for your request');
          this.setState({
            isLoading: false,
            loadMore: false
          });
          return;
        }

        if (query === '') {
          this.setState({
            isLoading: false,
            loadMore: false
          });
          return;
        }

        this.setState(prevState => ({
          images: page === 1
            ? hits
            : [...prevState.images, ...hits],

          totalHits: page === 1
            ? totalHits - hits.length
            : totalHits - [...prevState.images, ...hits].length,

          loadMore: true
        }));

        this.setState({
          isLoading: false
        });
      } catch (error) {
        Notify.failure(`Oops! Something went wrong! ${error}`);
        console.log(error);
      }
    }
  }

  onSubmit = (query) => {

    if (this.state.query === query) 
    return;

    this.setState({ 
      query, 
      page: 1,
      images: []
    });

  }

  handleLoadMore = () => {
    this.setState(prevState => (
      {
        isLoading: true,
        images: [...this.state.images],
        page: prevState.page + 1,
        loadMore: false
      }));
  };

  render() {

    const { images, isLoading, loadMore } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && <ImageGallery images={images} />}
        {loadMore && <Button onLoadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}
      </>
    );
  }
}

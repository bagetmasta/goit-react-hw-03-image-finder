import Notiflix from 'notiflix';
import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchCards } from 'components/Services/fetchCards';
import { Modal } from 'components/Modal/Modal';
const axios = require('axios').default;

export class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    isLoading: false,
    shouldButtonShow: true,
    isModalOpen: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== page) {
      this.fetchHits(query);
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      largeImageURL,
    }));
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSubmitClick = query => {
    this.setState({ page: 1 });

    this.fetchHits(query);
  };

  fetchHits = async query => {
    this.setState({ query, isLoading: true, shouldButtonShow: true });

    try {
      const { page } = this.state;

      const url = fetchCards(query, page);
      const response = await axios.get(url);

      const {
        data: { hits, totalHits },
      } = response;

      if (hits.length < 1 && page === 1) {
        this.setState({ isLoading: false, hits: [] });

        throw new Error(
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        );
      }

      if (this.state.page >= Math.ceil(totalHits / 12)) {
        this.setState({ shouldButtonShow: false });
      }

      this.setState(prevState =>
        prevState.page !== 1
          ? {
              hits: prevState.hits.concat(hits),
              isLoading: false,
            }
          : { hits, isLoading: false }
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, hits, shouldButtonShow, isModalOpen, largeImageURL } =
      this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.onSubmitClick} />
        <ImageGallery hits={hits} toggleModal={this.toggleModal} />

        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}

        {isLoading && <Loader />}
        {hits.length > 0 && shouldButtonShow && (
          <Button onClick={this.onLoadMoreClick} />
        )}
      </AppContainer>
    );
  }
}

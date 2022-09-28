import Notiflix from 'notiflix';
import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
const axios = require('axios').default;

const BASE_URL =
  'https://pixabay.com/api/?key=30118440-95e33267660d9ca313e5180ec';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    isLoading: false,
  };

  addHits = async () => {
    await this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    this.fetchHits(this.state.query);
  };

  onSubmitClick = query => {
    this.setState({ page: 1 });

    this.fetchHits(query);
  };

  fetchHits = async query => {
    this.setState({ query, isLoading: true });

    try {
      const params = new URLSearchParams({
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page: this.state.page,
      });

      const url = `${BASE_URL}&q=${query}&${params}`;
      const response = await axios.get(url);

      const {
        data: { hits },
      } = response;

      if (hits.length < 1 && this.state.page === 1) {
        this.setState({ isLoading: false, hits: [] });

        throw new Error(
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          )
        );
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
    const { isLoading, hits } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.onSubmitClick} />
        <ImageGallery hits={hits} />

        {isLoading && <Loader />}
        {hits.length > 0 && <Button onClick={this.addHits} />}
      </AppContainer>
    );
  }
}

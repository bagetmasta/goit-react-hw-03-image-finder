import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

const BASE_URL =
  'https://pixabay.com/api/?key=30118440-95e33267660d9ca313e5180ec';

export class App extends Component {
  state = {
    page: 1,
  };

  fetchPhoto = query => {
    const params = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: this.state.page,
    });

    // КАК ПОЛУЧИТЬ Р-Т DATA, ЧТОБЫ ПРОКИНУТЬ ЕГО ПРОПСОМ? ИЛИ КАК ЭТО ОБЫГРАТЬ?

    const test = fetch(`${BASE_URL}&q=${query}&${params}`)
      .then(r => r.json())
      .then(data => console.log(data));

    console.log(test);

    this.setState({ page: 1 });
  };

  render() {
    return <Searchbar onSubmit={this.fetchPhoto} />;
  }
}

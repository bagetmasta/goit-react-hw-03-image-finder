const BASE_URL =
  'https://pixabay.com/api/?key=30118440-95e33267660d9ca313e5180ec';

export const fetchCards = (query, page) => {
  const params = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page,
  });

  const url = `${BASE_URL}&q=${query}&${params}`;
  return url;
};

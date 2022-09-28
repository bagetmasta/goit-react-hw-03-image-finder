import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ onClick }) => (
  <LoadMoreButton onClick={onClick} type="button">
    Load more
  </LoadMoreButton>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

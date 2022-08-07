import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledButton } from './styled';

const ButtonLink = ({ children, to, homepage }) => (
  <StyledButton as={Link} homepage={homepage} to={to}>
    {children}
  </StyledButton>
);

export default ButtonLink;

ButtonLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  homepage: PropTypes.string,
};

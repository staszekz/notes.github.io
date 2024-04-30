import { Link } from 'react-router-dom';
import { StyledButton } from './styled';

export const ButtonLink = ({ children, to, homepage }) => (
  <StyledButton as={Link} homepage={homepage} to={to}>
    {children}
  </StyledButton>
);

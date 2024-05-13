import styled from 'styled-components';

export const StyledHomepageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 50%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem;

  transform: translate(-50%, -50%);
  transition: transform 0.25s ease-in-out;
  ${({ theme }) => theme.media.phone} {
    width: 90%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 80%;
    padding-top: 4rem;
  }
`;

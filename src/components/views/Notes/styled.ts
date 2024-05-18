import styled from 'styled-components';



export const StyledNotesList = styled.div`
  /* width: 100%; */
  height: 100%;
  margin: 0 auto;
  position: relative;
  top: 12vh;

  ${({ theme }) => theme.media.phone} {
    width: 95%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 95%;
  }
`;

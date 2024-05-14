import { Table } from '@mantine/core';
import styled from 'styled-components';
// import Table from 'react-bootstrap/Table';



export const StyledNotesList = styled.div`
  width: 70%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  top: 13vh;

  ${({ theme }) => theme.media.phone} {
    width: 95%;
  }
  ${({ theme }) => theme.media.landscape} {
    width: 95%;
  }
`;

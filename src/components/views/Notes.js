import React, { useEffect } from 'react';
import MainLayout from 'Layout/MainLayout';
import { StyledH2 } from 'components/H1/H1';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GlobalStyle from 'Theme/GlobalStyle';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { StyledButton } from 'components/Todo/TodoItem';
import { fetchNotes } from 'reducers/notesReducer';

const StyledTable = styled(Table)`
  color: ${({ theme }) => theme.colors.white};
  table-layout: auto;
`;

const Notes = ({ fetchNotes, notes, isLoading }) => {
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={fetchNotes} button="true">
        <StyledH2>my private notes</StyledH2>;
        <StyledTable striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Content</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={12}>
                  <Spinner animation="border" />
                </td>
              </tr>
            ) : (
              notes.reverse().map(note => (
                <>
                  <p>{note.title}</p>
                  <p>{note.date}</p>
                  <p>{note.content}</p>
                </>
              ))
            )}
          </tbody>
        </StyledTable>
      </MainLayout>
    </>
  );
};

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
  isLoading: state.notesReducer.isLoading,
  error: state.notesReducer.error,
});
const mapDispatchToProps = {
  fetchNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);

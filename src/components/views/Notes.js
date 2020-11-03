import React, { useEffect } from 'react';
import MainLayout from 'Layout/MainLayout';
import { StyledH2 } from 'components/H1/H1';
import { connect } from 'react-redux';
import withContext from 'components/context/withContext';
import styled from 'styled-components';
import GlobalStyle from 'Theme/GlobalStyle';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { fetchNotes } from 'reducers/notesReducer';
import NoteItem from 'components/Notes/NoteItem';

const StyledTable = styled(Table)`
  color: ${({ theme }) => theme.colors.white};
  table-layout: auto;
`;

const StyledNotesList = styled.div`
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

const Notes = ({ fetchNotes, notes, isLoading, pageContext }) => {
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={fetchNotes} button="true">
        <StyledH2>my private notes</StyledH2>;
        <StyledNotesList>
          <StyledTable striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Created</th>
                <th>Edition</th>
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
                notes.map((note, index) => (
                  <>
                    <NoteItem
                      key={note.id}
                      title={note.title}
                      created={note.created}
                      id={note.id}
                      index={index}
                      content={note.content}
                    />
                  </>
                ))
              )}
            </tbody>
          </StyledTable>
        </StyledNotesList>
        {!isLoading && !notes.length && (
          <StyledH2>Your note list is empty! Enter a new note! </StyledH2>
        )}
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

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Notes));

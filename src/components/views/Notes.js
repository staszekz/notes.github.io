import React, { useEffect, useState } from 'react';
import MainLayout from 'Layout/MainLayout';
import { StyledH1, StyledH2 } from 'components/H1/H1';
import { connect } from 'react-redux';
import withContext from 'components/context/withContext';
import styled from 'styled-components';
import GlobalStyle from 'Theme/GlobalStyle';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { fetchNotes, deleteNote } from 'reducers/notesReducer';
import NoteItem from 'components/Notes/NoteItem';
import NoteDetails from 'components/Notes/NoteDetails';

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

const Notes = ({ fetchNotes, notes, isLoading, deleteNote }) => {
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const [showID, setShowID] = useState('');

  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleShowDetails = id => {
    setDetailsVisible(!detailsVisible);
    setShowID(id);
    console.log('z notes gowny', id);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(!detailsVisible);
    setShowID('');
  };

  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={fetchNotes} button="true">
        <StyledNotesList>
          <StyledH1>My Private Notes</StyledH1>;
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
                      showDetails={handleShowDetails}
                      onDelete={deleteNote}
                    />
                    {showID === note.id && (
                      <NoteDetails
                        isVisible={detailsVisible}
                        onClose={handleCloseDetails}
                        content={note.content}
                        id={note.id}
                        title={note.title}
                        created={note.created}
                        onDelete={deleteNote}
                      />
                    )}
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
  deleteNote,
};

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Notes));

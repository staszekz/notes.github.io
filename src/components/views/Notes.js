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
import Filters from 'components/filters/Filters';

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
  const [filterTitle, setFilterTitle] = useState('');
  const [filterContent, setFilterContent] = useState('');

  const handleShowDetails = id => {
    setDetailsVisible(!detailsVisible);
    setShowID(id);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(!detailsVisible);
    setShowID('');
  };

  const handleFilterTitleChange = e => {
    setFilterTitle(e.target.value);
  };
  const handleFilterContentChange = e => {
    setFilterContent(e.target.value);
  };

  const clearFilter = () => {
    setFilterTitle('');
    setFilterContent('');
  };

  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={fetchNotes} button="true">
        <StyledNotesList>
          <StyledH1>My Private Notes</StyledH1>;
          <Filters
            onTitleFilter={handleFilterTitleChange}
            onContentFilter={handleFilterContentChange}
            titleText={filterTitle}
            contentText={filterContent}
            onClear={clearFilter}
          />
          <StyledTable striped responsive>
            <thead>
              <tr key={1}>
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
                notes
                  .filter(note => note.title.toLowerCase().includes(filterTitle.toLowerCase()))
                  .filter(note => note.content.toLowerCase().includes(filterContent.toLowerCase()))
                  .map((note, index) => (
                    <React.Fragment key={note.id}>
                      <NoteItem
                        key={note.id}
                        title={note.title}
                        created={note.created}
                        id={note.id}
                        index={index}
                        showDetails={handleShowDetails}
                        onDelete={deleteNote}
                      />
                      {showID === note.id && (
                        <NoteDetails
                          key={note.created}
                          isVisible={detailsVisible}
                          onClose={handleCloseDetails}
                          content={note.content}
                          id={note.id}
                          title={note.title}
                          created={note.created}
                          onDelete={deleteNote}
                        />
                      )}
                    </React.Fragment>
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

import React, { useEffect, useState } from 'react';
import { StyledH1, StyledH2, Filters, NoteDetails, NoteItem } from '@notes/components';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { StyledNotesList, StyledTable } from './styled';
import { RootState, fetchNotes, deleteNote } from '@notes/redux';
import { GlobalStyle } from '@notes/theme';
import { MainLayout } from '@notes/layout';

export const Notes = () => {
  const { notes, isLoading, error } = useSelector((state: RootState) => ({
    notes: state.notesReducer.notes,
    isLoading: state.notesReducer.isLoading,
    error: state.notesReducer.error,
  }));

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

  const handleFetchNotes = () => fetchNotes();
  const handleDeleteNote = (id: string) => deleteNote(id);
  return (
    <>
      <GlobalStyle />
      <MainLayout onAddFetch={handleFetchNotes} button="true">
        <StyledNotesList>
          <StyledH1>My Private Notes</StyledH1>;
          <Filters
            onTitleFilter={handleFilterTitleChange}
            onContentFilter={handleFilterContentChange}
            titleText={filterTitle}
            contentText={filterContent}
            onClear={clearFilter}
            // onDeadlineFilter={undefined}
            // deadlineText={undefined}
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
                        onDelete={handleDeleteNote}
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
                          onDelete={handleDeleteNote}
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

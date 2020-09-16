import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from 'atoms/Input/Input';
import Button from 'atoms/Button/Button';
import withContext from 'HOC/withContext';
import Heading from 'atoms/Heading/Heading';
import { connect } from 'react-redux';
import { addItem as addNoteAction } from 'actions';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import pageContext from '../../../context';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.5s ease-in-out;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const NewItemBar = ({ pageContext, isVisible, addItem, handleClose }) => (
  <StyledWrapper isVisible={isVisible} activecolor={pageContext}>
    <Heading big>Create new {pageContext}</Heading>

    <Formik
      initialValues={{ title: '', content: '', articleUrl: '', twitterName: '', created: '' }}
      onSubmit={values => {
        addItem(pageContext, values);
        handleClose();
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <StyledForm>
          <StyledInput
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="title"
            placeholder="title"
            value={values.title}
          />
          {pageContext === 'twitters' && (
            <StyledInput
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="twitterName"
              value={values.twitterName}
              placeholder="Account Name eg. hello_roman"
            />
          )}
          {pageContext === 'articles' && (
            <StyledInput
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              name="articleUrl"
              placeholder="link"
              value={values.articleUrl}
            />
          )}
          <StyledTextArea
            onChange={handleChange}
            onBlur={handleBlur}
            as="textarea"
            type="text"
            name="content"
            value={values.content}
            placeholder="content"
          />
          <Button type="submit" activecolor={pageContext}>
            Add Note
          </Button>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

NewItemBar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

NewItemBar.defaultProps = {
  pageContext: 'notes',
};

const mapDispatchToProps = dispatch => ({
  addItem: (itemType, itemContent) => dispatch(addNoteAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(NewItemBar));

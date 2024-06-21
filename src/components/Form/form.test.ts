import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { StyledModalInput } from 'components/atoms/StyledInputs';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../Theme/theme';
import Todos from 'components/views/Todos/Todos';
import AddTask from 'components/Form/Form';
import { BrowserRouter } from 'react-router-dom';

const setup = () => {
  const component = render(
    <ThemeProvider theme={ theme } isModalOpen = { true} >
    <StyledModalInput name="title" placeholder = "new deadline" />
    </ThemeProvider>,
  );
  const styledInput = component.findByPlaceholderText('new deadline');
  const componentWithDashboard = render(
    <Provider store={ store } >
  <BrowserRouter basename={ process.env.PUBLIC_URL } >
  <ThemeProvider theme={ theme } isModalOpen = { true} >
  <Todos />
  < AddTask />
  </ThemeProvider>
  < /BrowserRouter>
  < /Provider>,
  );
  return {
    styledInput,
    ...component,
    ...componentWithDashboard,
  };
};

describe('Form accepts proper data', () => {
  it('render the input', async () => {
    const { styledInput } = setup();
    expect(await styledInput).toBeInTheDocument();
    expect(await styledInput).toHaveAttribute('name', 'title');
  });
  it('displays the provided data', async () => {
    const { styledInput } = setup();
    fireEvent.change(await styledInput, { target: { value: 'some new task title' } });
    expect(await styledInput).toHaveValue('some new task title');
  });
});

describe('Form will add task to list', () => {
  it('renders component with dashboard', async () => {
    const { ...componentWithDashboard } = setup();
    const title = componentWithDashboard.getByText('Todos List');
    expect(title).toBeInTheDocument();
  });
});

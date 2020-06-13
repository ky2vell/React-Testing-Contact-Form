import React from 'react';
import ReactDOM from 'react-dom';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ContactForm from './ContactForm';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('contact form validates and persists data on submit', async () => {
  act(() => {
    ReactDOM.render(<ContactForm />, container);
  });

  const firstName = screen.getByLabelText(/first name/i);
  const lastName = screen.getByLabelText(/last name/i);
  const email = screen.getByLabelText(/email/i);
  const message = screen.getByLabelText(/message/i);
  const submit = screen.getByTestId('submit');

  await act(async () => {
    fireEvent.input(firstName, { target: { value: 'Kyle' } });
    fireEvent.blur(firstName);
  });

  await act(async () => {
    fireEvent.input(lastName, { target: { value: 'Lovell' } });
    fireEvent.blur(lastName);
  });

  await act(async () => {
    fireEvent.input(email, { target: { value: 'coolguy@gmail.com' } });
    fireEvent.blur(email);
  });

  await act(async () => {
    fireEvent.input(message, { target: { value: 'I am a very cool guy.' } });
    fireEvent.blur(message);
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  expect(document.body).not.toContainHTML('Looks like there was an error');
  expect(document.body).toContainHTML('"firstName": "Kyle"');
});

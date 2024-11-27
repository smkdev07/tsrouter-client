import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

import { actions } from '#client/store/reducer';

import { StyledForm } from './MainComponent.styled';

export function MainComponent() {
  const welcomeMessage = useSelector((state) => state.appState.welcomeMessage);
  const dispatch = useDispatch();

  const onSubmit = useCallback(
    /**
     * @param {EventTarget} e
     */
    (e) => {
      e.preventDefault();
      /** @type {HTMLFormElement} */
      const targetForm = e.target;
      if (targetForm.elements.welcomeMessage?.value) {
        dispatch(actions.setWelcomeMessage(targetForm.elements.welcomeMessage.value));
      }
    },
    [dispatch],
  );
  return (
    <Container maxWidth="sm">
      <h1>New Frontend Application</h1>
      <p>{welcomeMessage}</p>
      <StyledForm onSubmit={onSubmit}>
        <FormControl>
          <InputLabel htmlFor="welcomeMessage">New Welcome Message</InputLabel>
          <Input id="welcomeMessage" name="welcomeMessage" />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Set Welcome Message
        </Button>
      </StyledForm>
    </Container>
  );
}

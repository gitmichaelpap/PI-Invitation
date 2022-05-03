import React from 'react';
import { useSnackbar } from "notistack";
import { IconButton, SnackbarContent } from '@material-ui/core';
import { CheckCircle, Close as CloseIcon, Error, Info, Warning } from '@material-ui/icons';
import '~/components/snackbar/index.css';

const colors = {
  primary: '#0077b5', //$blue-font
  secondary: '#858796', //$gray-btn
  success: '#1cc88a', //$green
  error: '#e74a3b', //$red
  warning: '#f6c23e', //$yellow
  info: '#489FF1', //$blue-info
};

const snack = (message, closeSnackbar, backgroundColor, icon = null) => {
  return {
      persist: false,
      anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
      },
      content: (key) => (
          <SnackbarContent
              message={
                  <span className="snacktext">
                      {icon}
                      {message}
                  </span>
              }
              style={{ backgroundColor }}
              action={
                  <IconButton key="close" aria-label="Close" color="inherit" onClick={() => closeSnackbar(key)}>
                      <CloseIcon />
                  </IconButton>
              }
          />
      ),
  };
};

export function MySnackbar() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const alert = (text) => enqueueSnackbar(('', snack(text, closeSnackbar, colors.info, <Info className="iconSnack" />)));
  const err = (text) => enqueueSnackbar('', snack(text, closeSnackbar, colors.error, <Error className="iconSnack" />));
  const info = (text) => enqueueSnackbar('', snack(text, closeSnackbar, colors.warning, <Warning className="iconSnack" />));
  const success = (text) => enqueueSnackbar('', snack(text, closeSnackbar, colors.success, <CheckCircle className="iconSnack" />));

  return { alert, err, info, success };
}
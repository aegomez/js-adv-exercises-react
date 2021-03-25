import React, { useState } from 'react';
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2, 0),
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
}));

function Example({
  storageHook,
  storageKey = 'hooks-example',
  initialValue,
  subtitle = 'useState',
}) {
  const useStorageHook =
    storageHook instanceof Function ? storageHook : useState;
  const [localValue, setLocalValue] = useState('');
  const [storedValue, setStoredValue] = useStorageHook(
    storageKey,
    initialValue
  );
  const classes = useStyles();

  function handleChange(event) {
    setLocalValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStoredValue(localValue);
    setLocalValue('');
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h5">Storage Hooks Example</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        <TextField
          fullWidth
          id="value"
          name="value"
          label="New value"
          placeholder="Hello World"
          variant="outlined"
          value={localValue}
          onChange={handleChange}
        />
        <Button type="submit" color="primary" fullWidth variant="contained">
          Update
        </Button>
      </form>
      <Typography variant="body1">Stored value:</Typography>
      <Typography variant="body1" title="value">
        {storedValue}
      </Typography>
    </Container>
  );
}

export default Example;

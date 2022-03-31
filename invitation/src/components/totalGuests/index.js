import * as React from 'react';
import { Typography } from '@mui/material';
import moment from 'moment';
import Http from '~/config/Http';

export default function TotalGuests() {
  const [guestConfirmed, setGuestConfirmed] = React.useState(0);
  const [guestTotal, setGuestsTotal] = React.useState(0);

  React.useEffect(() => {
      getGuests();
  }, [])

  const getGuests = async () => {
    let guests = await Http.getAllGuests();

    debugger;

    setGuestsTotal(guests.data.length);

    guests = guests.data?.filter(f => f.confirmation)
      .sort((x, y) => moment(y.confirmationDate) - moment(x.confirmationDate) );

      setGuestConfirmed(guests.length);
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Convidados Confirmados
      </Typography>
      <Typography component="p" variant="h4">
        {guestConfirmed}
      </Typography>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Total de Convidados
      </Typography>
      <Typography component="p" variant="h4">
        {guestTotal}
      </Typography>
    </React.Fragment>
  );
}
import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Depósitos recentes
      </Typography>
      <Typography component="p" variant="h4">
        R$:3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        em 15 Março, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver saldo
        </Link>
      </div>
    </React.Fragment>
  );
}
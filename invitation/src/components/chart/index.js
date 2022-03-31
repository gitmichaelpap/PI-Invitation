import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';
import { UserContext } from '~/common/contexts/User';
import moment from 'moment';

function createData(time, amount) {
  return { time, amount };
}

function createAmont(amount, i) {
  if(i % 2 == 0){
    amount *= 0.2
  }else{
    amount += i
  }
  return amount;
}

export default function Chart() {
  const { engaged, weddingDay, dtRegister } = React.useContext(UserContext);
  const [dates, setDates] = React.useState([]);

  const theme = useTheme();
  
  React.useEffect(() => {
      getDates(dtRegister, weddingDay);
  }, [])

  const getDates = async (initDate, endDate) => {
    let resultDate = [];
    let resultAmount = 1;
    
    var diff = moment(endDate).diff(moment(initDate));
    var months = moment.duration(diff).asMonths().toFixed(1);

    for (let i = 0; i < months + 1; i++) {
      resultAmount += createAmont(resultAmount, i)
      resultDate.push(createData(`${moment(initDate).add(i, 'month').format('MM/YYYY')}`, resultAmount))
    }
    setDates(resultDate)
  }  

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Doações
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={dates}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Doações (R$)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
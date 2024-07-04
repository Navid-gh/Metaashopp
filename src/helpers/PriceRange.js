import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import { updateRng } from '../redux/priceRngSlice';
function valuetext(value) {
  return `${value}°C`;
}
const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#6c66f3',
        darker: '#6c66f3',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });
export default function RangeSlider({min,max}) {
  const dispatch = useDispatch();
  const prices = useSelector(state=>state.priceRng)
  const [value, setValue] = React.useState([min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(updateRng(newValue));
  };

  return (
    <Box sx={{ width: "100%" }}>
     <ThemeProvider theme={theme}>
      <Slider
        max={max}
        min={min}
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        color="primary"
      />
     </ThemeProvider>
    </Box>
  );
}

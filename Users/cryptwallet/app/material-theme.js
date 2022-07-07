import { createMuiTheme } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

export default createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    fontSize: 15,
    useNextVariants: true,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        color: '#ffffff',
        backgroundColor: '#6258fb',

      },
    },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      isSelected: {
        backgroundColor: '#6258fb',
      },
      current: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#ffffff',
        backgroundColor: '#6258fb',
        '&:hover': {
          backgroundColor: '#7d7dfb',
          color: '#FFF',
        },
      },
    },
  },
});

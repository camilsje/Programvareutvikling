
// @mui is a library that has pre made components, we used it here and added some code ourself
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MoviProfile from './MoviProfile';
import MovieWatched from './MovieWatched';
import MovieLiked from './MovieLiked';
import MovieRecommendations from './Recommendations';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}

    >
      {value === index && (
        <Box sx={{ p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%',bgcolor:"#1a1a2e" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor:"#1a1a2e" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Sette filmer" {...a11yProps(0)} sx={{color:"White"}} />
          <Tab label="Favoritter" {...a11yProps(1)} sx={{color:"White"}}/>
          <Tab label="Vurderinger" {...a11yProps(2)} sx={{color:"White"}} />
          <Tab label="Anbefalt for meg" {...a11yProps(3)} sx={{color:"White"}} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <MovieWatched />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <MovieLiked/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MoviProfile/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <MovieRecommendations/>
      </CustomTabPanel>
    </Box>
  );
}

export default function tabs(){
    return(
        <BasicTabs/>
    )
}
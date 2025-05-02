import * as React from 'react';
import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TaskContainer = styled(Box)({
  width: '33%',
  height: '100vh',
  borderRight: '1px solid #e0e0e0',
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const Description: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <TaskContainer>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Description" />
          <Tab label="Visual Description" />
          <Tab label="Input/Output" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Typography>
          Problem description content goes here...
        </Typography>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Typography>
          Visual description content goes here...
        </Typography>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Box>
          <Typography variant="h6" gutterBottom>Standard Input</Typography>
          <textarea
            style={{ width: '100%', minHeight: '100px' }}
            placeholder="Enter input here..."
          />
          
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Standard Output</Typography>
          <textarea
            style={{ width: '100%', minHeight: '100px' }}
            placeholder="Expected output here..."
            readOnly
          />
        </Box>
      </TabPanel>
    </TaskContainer>
  );
};

export default Description;
import * as React from 'react';
import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from '@uiw/react-md-editor';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TaskContainer = styled(Box)({
  width: '33%',
  height: '100vh',
  borderRight: '1px solid #444', // Lighter border for dark theme
  backgroundColor: '#1e1e1e', // Dark background
  color: '#ffffff', // Default text color to white
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
  const [value, setValue] = useState("**Hello world!!!**");
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <TaskContainer>
      <Box sx={{ borderBottom: 1, borderColor: '#444' }}> {/* Lighter border */}
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          textColor="inherit" // Use inherited color (white from TaskContainer)
          indicatorColor="primary" // Or choose a suitable indicator color like "secondary" or a custom one
          sx={{
            '& .MuiTab-root': { // Style for individual tabs
              color: '#aaa', // Dim color for unselected tabs
              '&.Mui-selected': {
                color: '#ffffff', // Bright color for selected tab
              },
            },
          }}
        >
          <Tab label="Description" />
          <Tab label="Visual Description" />
          <Tab label="Input/Output" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Typography sx={{ color: '#eee' }}> {/* Lighter text color */}
          <MDEditor value={value} onChange={setValue} />
        </Typography>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <Typography sx={{ color: '#eee' }}> {/* Lighter text color */}
          <MarkdownPreview source={value} style={{ padding: 16 }} />
        </Typography>
      </TabPanel>

      <TabPanel value={selectedTab} index={2}>
        <Box>
          <Typography variant="h6" gutterBottom sx={{ color: '#eee' }}>Standard Input</Typography>
          <textarea
            style={{
              width: '100%',
              minHeight: '100px',
              backgroundColor: '#2a2a2a', // Dark background for textarea
              color: '#eee', // Light text color
              border: '1px solid #444', // Lighter border
              padding: '8px',
              boxSizing: 'border-box',
              fontFamily: 'monospace', // Optional: Use monospace font
            }}
            placeholder="Enter input here..."
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#eee' }}>Standard Output</Typography>
          <textarea
            style={{
              width: '100%',
              minHeight: '100px',
              backgroundColor: '#2a2a2a', // Dark background for textarea
              color: '#aaa', // Slightly dimmer text for read-only output
              border: '1px solid #444', // Lighter border
              padding: '8px',
              boxSizing: 'border-box',
              fontFamily: 'monospace', // Optional: Use monospace font
            }}
            placeholder="Expected output here..."
            readOnly
          />
        </Box>
      </TabPanel>
    </TaskContainer>
  );
};

export default Description;
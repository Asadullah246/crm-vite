import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

export default function OrderQuery({setStatus}) {
  return (
    <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}
    onChange={(event, newValue) =>{
        if(newValue==0) {
            setStatus("")
        }
        if(newValue==1) {
            setStatus("active")
        }
        if(newValue==2) {
            setStatus("pending")
        }
    }}
    >
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: 'xl',
          bgcolor: 'background.level1',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'background.surface',
          },
        }}
      >
        <Tab disableIndicator >All</Tab>
        <Tab disableIndicator>Active</Tab>
        <Tab disableIndicator>Pending</Tab>
        {/* <Tab disableIndicator>Support</Tab> */}
      </TabList>
    </Tabs>
  );
}

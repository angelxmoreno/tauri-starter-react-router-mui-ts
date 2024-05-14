import ListItemButtonLink from '@app/components/ListItemButtonLink.tsx';
import ThemeModeToggle from '@app/components/ThemeModeToggle.tsx';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { FC } from 'react';

const drawerWidth = 240;
const MenuDrawer: FC = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    <ListItemButtonLink to="/" label="Home" iconName="Inbox" />
                    <ListItemButtonLink to="/theme-control" label="Theme" iconName="Contrast" />
                    <ListItemButtonLink to="/database-integration" label="Database" iconName="Storage" />
                    <ListItemButtonLink to="/auth-integration" label="Authentication" iconName="ManageAccounts" />
                    <ListItemButtonLink to="/other" label="Other" iconName="MoveToInbox" />
                    <ListItemButtonLink to="/feeds" label="Feeds" iconName="RssFeed" />
                </List>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ThemeModeToggle />
                </List>
            </Box>
        </Drawer>
    );
};

export default MenuDrawer;

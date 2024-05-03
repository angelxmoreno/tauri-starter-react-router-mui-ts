import { IconComponent, IconNames } from '@app/components/IconComponent.tsx';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import { Link, useMatch } from 'react-router-dom';

type ListItemButtonLinkProps = {
    to: string;
    label: string;
    iconName: IconNames;
};

const ListItemButtonLink: FC<ListItemButtonLinkProps> = ({ to, label, iconName }) => {
    const match = useMatch(to);
    const isActive = !!match;
    return (
        <ListItemButton component={Link} to={to} selected={isActive}>
            <ListItemIcon>
                <IconComponent iconName={iconName} />
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export default ListItemButtonLink;

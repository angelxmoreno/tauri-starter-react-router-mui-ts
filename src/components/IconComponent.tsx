import * as Icons from '@mui/icons-material';
import { FC } from 'react';

export type IconNames = keyof typeof Icons;
export type IconProps = {
    iconName: IconNames;
};

export const IconComponent: FC<IconProps> = ({ iconName }) => {
    const Icon = Icons[iconName];
    return <Icon />;
};

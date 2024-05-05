import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';
import { FC } from 'react';
import { Link as RRLink, LinkProps as RRLinkProps } from 'react-router-dom';

type AnchorProps = Omit<MUILinkProps, 'component'> & RRLinkProps;
const Anchor: FC<AnchorProps> = props => {
    return <MUILink component={RRLink} {...props} />;
};

export default Anchor;

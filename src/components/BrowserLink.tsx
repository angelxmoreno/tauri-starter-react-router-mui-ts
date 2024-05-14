import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';
import { open } from '@tauri-apps/api/shell';
import { FC } from 'react';

type BrowserLinkProps = Omit<MUILinkProps, 'onClick' | 'href'> & { href: string };

const BrowserLink: FC<BrowserLinkProps> = ({ href, ...props }) => {
    const handleClick = () => open(href);
    return <MUILink {...props} onClick={handleClick} href="#" />;
};

export default BrowserLink;

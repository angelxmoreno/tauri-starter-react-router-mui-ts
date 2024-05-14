import BrowserLink from '@app/components/BrowserLink.tsx';
import { extractRss, FeedData } from '@app/utils/extractRss.ts';
import { FeedEntry } from '@extractus/feed-extractor';
import { Button, FormGroup, TextField } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { formatDistanceToNow } from 'date-fns';
import { FC, FormEventHandler, useCallback, useState } from 'react';

type TextInputOnChangeHandler = FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const FeedsScreen: FC = () => {
    const [rssUrl, setRssUrl] = useState('');

    const [result, setResult] = useState<FeedData | undefined>();

    const handleOnTextChange: TextInputOnChangeHandler = e => setRssUrl(e.currentTarget.value);

    const handleOnButtonClick = async () => {
        if (rssUrl.trim() === '') return;
        const parsed = await extractRss(rssUrl);
        if (parsed) setResult(parsed);
    };

    const renderTableRow = useCallback(
        (row: FeedEntry) => (
            <TableRow key={`${row.id}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{formatDistanceToNow(row.published)}</TableCell>
            </TableRow>
        ),
        [],
    );
    return (
        <>
            <Typography paragraph>This is feeds screen</Typography>
            <FormGroup>
                <TextField label="RSS URL" onChange={handleOnTextChange} margin="dense" defaultValue={rssUrl} />
                <Button variant="contained" onClick={handleOnButtonClick}>
                    Fetch Entries
                </Button>
            </FormGroup>
            {result?.entries?.map(({ id, title, description, link, published }) => (
                <div key={id}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    {link && <BrowserLink href={link}>{link}</BrowserLink>}
                    <hr />
                </div>
            ))}
        </>
    );
};

export default FeedsScreen;

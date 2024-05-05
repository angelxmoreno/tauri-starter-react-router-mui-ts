import { IconComponent } from '@app/components/IconComponent.tsx';
import { Greetings } from '@app/database/dbTypes.ts';
import { useGreetings } from '@app/database/hooks/useGreetings.ts';
import { Button, FormGroup, IconButton, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatDistanceToNow } from 'date-fns';
import { Selectable } from 'kysely';
import { FC, FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';

type TextInputOnChangeHandler = FormEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const Greeter: FC = () => {
    const { greetings, getGreetings, addGreeting, deleteGreetings } = useGreetings();
    const [greetMsg, setGreetMsg] = useState('');
    const [name, setName] = useState('');

    const handleOnButtonClick = useCallback(() => {
        if (name.trim() === '') return;
        addGreeting(name);
        setGreetMsg(`Hello ${name}`);
    }, [name]);

    const handleOnTextChange: TextInputOnChangeHandler = e => setName(e.currentTarget.value);

    const renderTableRow = useCallback(
        (row: Selectable<Greetings>) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell size="small">
                    <IconButton
                        color="error"
                        onClick={() => deleteGreetings(Number(row.id))}
                        aria-label="Delete greeting"
                    >
                        <IconComponent iconName="Delete" />
                    </IconButton>
                </TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{formatDistanceToNow(row.created_at)}</TableCell>
            </TableRow>
        ),
        [],
    );

    useEffect(() => {
        getGreetings();
    }, []);

    return (
        <div>
            <FormGroup>
                <TextField label="Name" onChange={handleOnTextChange} margin="dense" />
                <Button variant="contained" onClick={handleOnButtonClick}>
                    Greet
                </Button>
            </FormGroup>
            <p>{greetMsg}</p>

            <hr />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell size="small" component="th" scope="row" />
                            <TableCell component="th" scope="row">
                                ID
                            </TableCell>
                            <TableCell component="th" scope="row">
                                NAME
                            </TableCell>
                            <TableCell component="th" scope="row">
                                CREATED
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{greetings.map(renderTableRow)}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Greeter;

import { IconComponent } from '@app/components/IconComponent.tsx';
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
import { FC, FormEventHandler, useEffect, useState } from 'react';

const Greeter: FC = () => {
    const { greetings, getGreetings, addGreeting, deleteGreetings } = useGreetings();
    const [greetMsg, setGreetMsg] = useState('');
    const [name, setName] = useState('');

    const handleOnButtonClick = async () => {
        if (name.trim() === '') return;
        addGreeting(name);
        setGreetMsg(`Hello ${name}`);
    };

    const handleOnTextChange: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = e =>
        setName(e.currentTarget.value);
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
                    <TableBody>
                        {greetings.map(row => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell size="small">
                                    <IconButton color="error" onClick={() => deleteGreetings(Number(row.id))}>
                                        <IconComponent iconName="Delete" />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{formatDistanceToNow(row.created_at)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Greeter;

import { Button } from '@mui/material';

function Toogle() {
    return (
        <div className='toogleComponent'>
            <Button variant="contained" href='/' className='buttonMobile'>Home</Button>
            <Button variant="contained" href='/services' className='buttonMobile'>Serviços</Button>
            <Button variant="contained" href='/contato' className='buttonMobile'>Contato</Button>
            <Button variant="contained" href='/agenda' className='buttonMobile'>Agenda</Button>
        </div>
    );
}

export default Toogle;
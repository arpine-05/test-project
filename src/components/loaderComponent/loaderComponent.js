import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './loaderComponent.scss';
const LoaderComponent = ()=>{
    return (
        <div className='loader'>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>

    );
}
export default LoaderComponent;
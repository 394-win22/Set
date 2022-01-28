import {useState} from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';

const ToggleButtonSelector = ({items, formats, setFormats}) => {
    const [state, setState] = useState(false);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
        setState(true);
    };

    return (
    <>
    <Snackbar
        open={state}
        onClose={(event, eventName) => {if(eventName == "timeout"||formats.length == 0){setState(false)}}}
        TransitionComponent={Fade}
        autoHideDuration={2000}
        message={formats[formats.length-1]}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        key="snapbar-Fade"
        sx={{ top: { xs: 60, sm: 30, width: 'auto' } }}
      />
    <ToggleButtonGroup
        color="primary"
        value={formats}
        onChange={handleFormat}
        className="justify-content-center"
    >
        {
            Object.entries(items).map((pair, index) => (
                <ToggleButton value={pair[0]} key={index}>
                    <i className={pair[1]}></i>
                </ToggleButton>
            ))
        }
    </ToggleButtonGroup>
    </>
    )
}

export default ToggleButtonSelector;
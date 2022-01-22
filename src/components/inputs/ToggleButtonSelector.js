import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ToggleButtonSelector = ({items, formats, setFormats}) => {
    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    return (
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
    )
}

export default ToggleButtonSelector;
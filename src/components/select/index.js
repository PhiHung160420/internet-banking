import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

BasicSelect.propTypes = {
    label: PropTypes.string,
    selectList: PropTypes.array,
    handleChangeValue: PropTypes.func,
    selectedValue: PropTypes.number,
};

export default function BasicSelect({ selectList, label, selectedValue, handleChangeValue }) {
    const handleChange = (event) => {
        handleChangeValue(event.target.value);
    };
    return (
        <Box sx={{ width: 280 }} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedValue}
                    label={label}
                    onChange={handleChange}
                >
                    {selectList.map((item) => (
                        <MenuItem value={item}>{item.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

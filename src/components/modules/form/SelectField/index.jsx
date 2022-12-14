import { FormControl, InputLabel, Select } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

function SelectField({ name, control, label, type, children, ...props }) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });
    return (
        <FormControl>
            <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
            <Select
                fullWidth
                type={type}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                inputRef={ref}
                error={!!error}
                {...props}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            >
                {children}
            </Select>
        </FormControl>
    );
}

export default SelectField;

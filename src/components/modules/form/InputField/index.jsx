import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

function InputField({ name, control, label, customOnChange = undefined, rules, type, ...props }) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
    });

    return (
        <TextField
            type={type}
            label={label}
            inputRef={ref}
            {...props}
            error={!!error}
            helperText={error?.message}
            name={name}
            value={value}
            onChange={customOnChange ? (event) => customOnChange(event, onChange) : onChange}
            onBlur={onBlur}
        />
    );
}

export default InputField;

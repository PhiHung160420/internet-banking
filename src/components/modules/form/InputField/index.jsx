import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

function InputField({ name, control, label, type, ...props }) {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    //Render UI input as MUI Field, Antd or customize input field,....
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
            onChange={onChange}
            onBlur={onBlur}
        />
    );
}

export default InputField;

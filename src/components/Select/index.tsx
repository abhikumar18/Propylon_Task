import React from 'react';
import MuiSelect from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem, SxProps } from '@mui/material';

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps;
}

const Select: React.FC<SelectProps> = ({
  label,
  onChange,
  value,
  options,
  sx = {},
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <MuiSelect
        value={value || 'All'}
        labelId="select-label"
        label={label}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        sx={sx}
      >
        {options.map(({ label, value }, index) => (
          <MenuItem key={index} value={value}>{label}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;

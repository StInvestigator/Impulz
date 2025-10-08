import {
    Autocomplete,
    Chip,
    TextField,
    Box,
} from '@mui/material';
import type { SyntheticEvent } from 'react';

type Option = {
    label: string;
    value: string;
};

export interface MySelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    width?: number | string;
}

export default function MySelect({
                                     options,
                                     value,
                                     onChange,
                                     placeholder = '-не вибрано-',
                                     width = 589,
                                 }: MySelectProps) {
    const selectedOptions = options.filter((option) =>
        value.includes(option.value)
    );

    const handleChange = (_: SyntheticEvent, newValue: Option[]) => {
        onChange(newValue.map((item) => item.value));
    };

    const handleInputChange = (_: SyntheticEvent, newInputValue: string) => {
        console.log('Search input:', newInputValue);
    };

    return (
        <Box sx={{ width }}>
            <Autocomplete<Option, true, false, false>
                multiple
                options={options}
                getOptionLabel={(option) => option.label}
                value={selectedOptions}
                onChange={handleChange}
                onInputChange={handleInputChange}
                isOptionEqualToValue={(option, val) => option.value === val.value}
                filterSelectedOptions
                renderTags={() => null}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        variant="outlined"
                        sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '15px',
                            border: 'none',
                            '& .MuiOutlinedInput-root': {
                                padding: '6px 12px',
                            },
                            '& input': {
                                fontFamily: 'Work Sans, sans-serif',
                                fontSize: '16px',
                                fontWeight: 400,
                            },
                        }}
                    />
                )}
                sx={{
                    '& .MuiAutocomplete-inputRoot': {
                        padding: 0,
                    },
                }}
            />

            {selectedOptions.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {selectedOptions.map((option) => (
                        <Chip
                            key={option.value}
                            label={option.label}
                            sx={{ bgcolor: 'white' }}
                            onDelete={() =>
                                onChange(value.filter((v) => v !== option.value))
                            }
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}

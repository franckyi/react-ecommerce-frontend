import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FiltersContext } from '../../model/filterContext';

const marks = [
    {
        value: 1,
        label: '$1',
    },
    {
        value: 2500,
        label: '$2.500',
    },
    {
        value: 5000,
        label: '$10.000',
    }
];

function valuetext(value: number) {
    return `$${value}`;
}

export default function PriceSlider() {
    const [value, setValue] = React.useState<number[]>([1, 5000]);
    const { filters, setFilters } = React.useContext(FiltersContext);

    const handleChange = (event: Event, newValue: number | number[]) => {
        console.log('changed price range:', newValue)
        setValue(newValue as number[]);
        setFilters({
            ...filters,
            price: {
                min: newValue[0],
                max: newValue[1],
            }
        })
    };

    return (
        <Box sx={{ width: 300, height: 200, display: 'flex', gap: '15px' }}>
            <span>Price: </span>
            <Slider
                aria-label="Always visible"
                getAriaValueText={valuetext}
                step={10}
                marks={marks}
                valueLabelDisplay="on"
                value={value}
                onChange={handleChange}
                min={1}
                max={5000}
            />
        </Box>
    );
}
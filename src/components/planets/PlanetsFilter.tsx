import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CHECKBOX_ICON = <CheckBoxOutlineBlankIcon fontSize="small" />;
const CHECKED_CHECKBOX_ICON = <CheckBoxIcon fontSize="small" />;

interface OptionType {
    id?: string;
    name?: string;
}

interface PlanetsFilterProps {
    id: string;
    options: OptionType[];
    selectedValues: string[];
    onChange: (values: string[]) => void;
    label: string;
}

const PlanetsFilter = (props: PlanetsFilterProps) => {
    const { id, options, selectedValues, onChange, label } = props;

    return (
        <Autocomplete
            multiple
            id={id}
            options={options}
            value={options.filter(option => selectedValues.includes(option.name!))}
            disableCloseOnSelect
            limitTags={2}
            getOptionLabel={(option) => option.name!}
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        <Checkbox
                            icon={CHECKBOX_ICON}
                            checkedIcon={CHECKED_CHECKBOX_ICON}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                );
            }}
            style={{ width: 325 }}
            onChange={(_e, value) => onChange(value.map(option => option.name!))}
            renderInput={(params) => (
                <TextField {...params} label={label} />
            )}
        />
    );
};

export default PlanetsFilter;
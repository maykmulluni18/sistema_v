import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';


const URI4 = DB_URL + 'user/'

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
        ...style,
        top: style.top + LISTBOX_PADDING,
    };

    if (dataSet.hasOwnProperty('group')) {
        return (
            <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
                {dataSet.group}
            </ListSubheader>
        );
    }

    return (
        <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
            {`#${dataSet[2] + 1} - ${dataSet[1]}`}
        </Typography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
        noSsr: true,
    });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
        if (child.hasOwnProperty('group')) {
            return 48;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.node,
};

function random(length) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});



const FilterData = () => {
    //const [value, setValue] = useState("");
    const [administrativos, setAdministrativos] = useState([])

    const [id_administrativos, setIdAdministrativos] = useState('')

    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    //}

    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        console.log(res.data)
        setAdministrativos(res.data)
    }
    /* const rr=useCallback(()=>{
         getAdministrativos(administrativos)
     },[administrativos])*/

    useEffect(() => {
        getAdministrativos()
    }, [])

    const [inputValue, setInputValue] = React.useState('');

    return (<>
        <div>{`value: ${id_administrativos !== null ? `'${id_administrativos}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <Autocomplete
            value={
                id_administrativos
                    ? administrativos.find((option) => {
                        return id_administrativos === option.id;
                    }) ?? null
                    : null
            }

            onChange={(event, newValue) => {
                setIdAdministrativos(newValue ? newValue.id : null)
            }}
            //inputValue={inputValue}
            /*onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}*/
            disablePortal
            id="virtualize-demo"
            sx={{ width: 700 }}
            disableListWrap
            PopperComponent={StyledPopper}
            ListboxComponent={ListboxComponent}
            options={administrativos}
            groupBy={(option) => option.nombres}
            getOptionLabel={(option) => option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno}
            renderInput={(params) => <TextField {...params} label="Buscar" />}
            renderOption={(props, option, state) => [props, state?.item ? state.id : ' ', option.id + " " + option.nombres + " " + option.apellido_paterno + " " + option.apellido_materno]}
            // TODO: Post React 18 update - validate this conversion, look like a hidden bug
            renderGroup={(params) => params}
        />
    </>
    )

}

export default React.memo(FilterData)
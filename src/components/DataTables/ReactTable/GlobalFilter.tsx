import React from "react";
import { useAsyncDebounce, UseGlobalFiltersInstanceProps, UseGlobalFiltersState } from "react-table"

import SearchInput from "components/formInput/SearchInput";
import { InputProps } from "@mui/material";

export interface GlobalFilterProps {
  preGlobalFilteredRows: UseGlobalFiltersInstanceProps<any>['preGlobalFilteredRows'];
  globalFilter: UseGlobalFiltersState<any>['globalFilter'];
  setGlobalFilter: UseGlobalFiltersInstanceProps<any>['setGlobalFilter'];
  inputProps?: InputProps
}


const GlobalFilter: React.FC<GlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
  inputProps
}) => {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => { 
    setGlobalFilter(value || undefined)
  }, 200) // 200 is the delay for the user input
  
  return (
    <SearchInput
      value={value || ''}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      {...inputProps}
    />
  )
}

export default GlobalFilter
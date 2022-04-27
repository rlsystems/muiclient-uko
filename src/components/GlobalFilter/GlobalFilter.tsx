import React from "react";
import { useAsyncDebounce, UseGlobalFiltersInstanceProps, UseGlobalFiltersState } from "react-table"

import SearchInput from "components/SearchInput";
import { InputProps } from "@mui/material";

export interface GlobalFilterProps {
  preGlobalFilteredRows: UseGlobalFiltersInstanceProps<any>['preGlobalFilteredRows'];
  globalFilter: UseGlobalFiltersState<any>['globalFilter'];
  setGlobalFilter: UseGlobalFiltersInstanceProps<any>['setGlobalFilter'];
  inputProps?: InputProps
}

const GlobalFilter: React.FC<GlobalFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  inputProps
}) => {
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => { //QUESTION! -what is async debounce
    setGlobalFilter(value || undefined)
  }, 200) //QUESTION! - is 200 a delay from the typing input? thats cool...

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
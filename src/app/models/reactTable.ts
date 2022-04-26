import { TableOptions, UseExpandedOptions, UsePaginationOptions, UseSortByOptions } from "react-table";

export interface CustomTableOptions<D extends object>
  extends TableOptions<D>,
    UseExpandedOptions<D>,
    UsePaginationOptions<D>,
    UseSortByOptions<D> {};
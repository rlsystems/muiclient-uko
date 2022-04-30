import { action, makeAutoObservable } from "mobx";
import { ColorMode } from "theme";

export type RowsPerPage = 5 | 10 | 15 | 20 | 50

export default class PreferencesStore {
  colorMode: ColorMode = 'dark';
  rowsPerPage: RowsPerPage = 5;

  constructor() {
    makeAutoObservable(this)
  }

  setColorMode = action((colorMode: ColorMode) => {
    this.colorMode = colorMode;
  })

  setRowsPerPage = action((rowsPerPage: RowsPerPage) => {
    this.rowsPerPage = rowsPerPage;
  })
}
import { Injectable } from "@angular/core";
import { State } from "@ngxs/store";

export interface FileStateModel {}
export const fileInitialState: FileStateModel = {}

@State<FileStateModel>({
  name: 'fileState',
  defaults: fileInitialState
})
@Injectable()
export class FileState {}

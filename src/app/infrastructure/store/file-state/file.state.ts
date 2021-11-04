import { Injectable } from "@angular/core";
import { Action, createSelector, Selector, State, StateContext, Store } from "@ngxs/store";
import { patch } from "@ngxs/store/operators";
import { asapScheduler, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { FileService } from "../../services/file.service";
import { File, FileType, User } from '../../types/types';
import { UserState } from "../user-state/user.state";
import { CreateDirectory, CreateDirectoryFail, CreateDirectorySuccess,
  LoadFiles, LoadFilesFail, LoadFilesSuccess } from "./file.actions";

export interface FileStateModel {
  files: File[],
  currentDir: string | null,
}

export const fileInitialState: FileStateModel = {
  files: [],
  currentDir: null,
}

@State<FileStateModel>({
  name: 'fileState',
  defaults: fileInitialState
})
@Injectable()
export class FileState {

  constructor(
    private readonly store: Store,
    private readonly fileService: FileService,
  ) { }

  public static currentDir() {
    return createSelector(
      [UserState.currentUser, FileState],
      (currentUser: User, state: FileStateModel) =>
        state.currentDir ? state.currentDir : currentUser.id as string);
  }

  @Selector()
  public static files(state: FileStateModel) {
    return state.files;
  }

  @Action(LoadFiles)
  public loadFiles(
    { dispatch }: StateContext<FileStateModel>,
    { currentDir }: LoadFiles
  ) {
    return this.fileService.getFiles(currentDir).pipe(
      tap(
        response => response.status === 'success'
        ? asapScheduler.schedule(() => dispatch(new LoadFilesSuccess(response.files as File[])))
        : throwError(response.message)
      ),
      catchError((errorMessage: string) => dispatch(new LoadFilesFail(errorMessage))),
    );
  }

  @Action(LoadFilesSuccess)
  public loadFilesSuccess(
    { setState }: StateContext<FileStateModel>,
    { files }: LoadFilesSuccess,
  ) {
    setState(patch<FileStateModel>({ files }));
  }

  @Action(CreateDirectory)
  public createDirectory(
    { getState, dispatch }: StateContext<FileStateModel>,
    { fileName }: CreateDirectory,
  ) {
    const { currentDir } = getState();
    const parentId = currentDir ? currentDir : this.store.selectSnapshot(UserState.currentUser)?.id as string;
    const directoryData = { parent: parentId, type: 'dir' as FileType, name: fileName };

    return this.fileService.createDir(directoryData).pipe(
      tap(
        response => response.status === 'success'
        ? asapScheduler.schedule(() => dispatch(new CreateDirectorySuccess(response.file as File)))
        : throwError(response.message)
      ),
      catchError((errorMessage: string) => dispatch(new CreateDirectoryFail(errorMessage))),
    )
  }

  @Action(CreateDirectorySuccess)
  public createDirectorySuccess(
    { getState, setState }: StateContext<FileStateModel>,
    { file }: CreateDirectorySuccess,
  ) {
    setState(patch<FileStateModel>({ files: [ ...getState().files, file ]}));
  }
}

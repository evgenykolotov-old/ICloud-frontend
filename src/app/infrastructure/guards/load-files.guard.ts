import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { LoadFiles } from "../store/file-state/file.actions";
import { FileState } from "../store/file-state/file.state";
 
@Injectable({ providedIn: 'root' })
export class LaodFilesGuard implements CanActivate{

    constructor(
        private readonly store: Store,
    ) { }
 
    public canActivate(): Observable<boolean> | boolean {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(true)),
        );
    }

    private checkStore(): any {
        return this.store.select(FileState.currentDir()).pipe(
            switchMap(currentDir => this.store.dispatch(new LoadFiles(currentDir))),
            catchError(() => of(true)),
        )
    }
}
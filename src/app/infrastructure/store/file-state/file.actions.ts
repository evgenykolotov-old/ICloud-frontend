import { File } from '../../types/types';

export class LoadFiles {
	public static readonly type = '[File State] Load Files';
	constructor(public readonly currentDir: string) { }
}

export class LoadFilesSuccess {
	public static readonly type = '[File State] Load Files Success';
	constructor(public readonly files: File[]) { }
}

export class LoadFilesFail {
	public static readonly type = '[File State] Load Files Fail';
	constructor(public readonly errorMessage: string) { }
}

export class SetCurrentDir {
	public static readonly type = '[File State] Set Current Dir';
}

export class CreateDirectory {
	public static readonly type = '[File State] Create Directory';
	constructor(public readonly fileName: string) { }
}

export class CreateDirectorySuccess {
	public static readonly type = '[File State] Create Directory Success';
	constructor(public readonly file: File) { }
}

export class CreateDirectoryFail {
	public static readonly type = '[File State] Create Directory Fail';
	constructor(public readonly errorMessage: string) { }
}
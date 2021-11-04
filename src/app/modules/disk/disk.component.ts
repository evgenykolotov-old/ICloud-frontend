import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngxs/store";
import { DialogService } from "primeng/dynamicdialog";
import { filter } from "rxjs/operators";
import { CreateDirectory } from "src/app/infrastructure/store/file-state/file.actions";
import { FileState } from "src/app/infrastructure/store/file-state/file.state";
import { File } from "src/app/infrastructure/types/types";
import { CreateDirComponent } from "./create-dir/create-dir.component";

interface ColumnTable {
  header: string;
  field: string;
}

const DEFAULT_DISK_LIST_COLUMNS: ColumnTable[] = [
  { header: 'Название файла', field: 'name' },
  { header: 'Размер', field: 'size' },
  { header: 'Тип', field: 'type' },
  { header: 'Дата содания', field: 'dateCreate' },
];

@UntilDestroy()
@Component({
  selector: 'app-disk',
  templateUrl: './disk.component.html',
  styleUrls: ['./disk.component.css'],
})
export class DiskComponent implements OnInit {
  public files: File[] = [];
  public columns: ColumnTable[] = DEFAULT_DISK_LIST_COLUMNS;

  constructor(
    private readonly store: Store,
    private readonly dialogService: DialogService,
  ) { }

  public ngOnInit(): void {
    this.store.select(FileState.files)
      .pipe(untilDestroyed(this))
      .subscribe(files => this.files = files);
  }

  public openCreateDirectoryDialog(): void {
    const dialogRef = this.dialogService.open(CreateDirComponent, {
      header: 'Создание директории',
      width: '30%'
    });
    dialogRef.onClose
      .pipe(filter(response => Boolean(response)))
      .subscribe(({ result }) => this.store.dispatch(new CreateDirectory(result)));
  }
}
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DiskComponent } from "./disk.component";
import { CreateDirComponent } from "./create-dir/create-dir.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DiskComponent,
    CreateDirComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
  ],
  providers: [
    DialogService,
  ],
  exports: [
    DiskComponent
  ],
})
export class DiskModule { }
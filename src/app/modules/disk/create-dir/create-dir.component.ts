import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: 'app-create-dir',
  templateUrl: './create-dir.component.html',
  styleUrls: ['./create-dir.component.css'],
})
export class CreateDirComponent {
  public form: FormGroup = new FormGroup({
    directoryName: new FormControl('', Validators.required),
  });

  constructor(
    public ref: DynamicDialogRef,
  ) { }

  public createDirectory(): void {
    return this.ref.close({ result: this.form.get('directoryName')?.value });
  }
}
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FieldConfig } from '../../interfaces/fieldConfig';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent  implements OnInit {

  private fb = inject(FormBuilder)
  form: FormGroup;

  @Input() fields!: FieldConfig[];
  @Output() submitEvent = new EventEmitter<{ [key: string]: string | boolean }>();

  loginError = false;

  constructor() {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.fields.forEach((field) => {
      this.form.addControl(field.formControlName, this.fb.control(field.value, field.validators));
    });
  }

  getErrorMessage(field: FieldConfig): string {
    const control = this.form.controls[field.formControlName];
    for (const errorName in control.errors) {
      if (control.errors.hasOwnProperty(errorName)) {
        return field.errors[errorName]
      }
    }
    return '';
  }

  submit(){
    if (!this.form.valid) {
      this.loginError = true;
    } else {
      let values: { [key: string]: string | boolean } = {};
      this.fields.forEach(field => {
        values[field.formControlName] = this.form.controls[field.formControlName].value;
      });
      this.submitEvent.next(values);
    }
  }
}
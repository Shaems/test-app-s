import { ValidatorFn } from "@angular/forms";

export interface FieldConfig {
    formControlName: string;
    value?: string | boolean;
    iconName: string;
    type: string;
    placeholder: string;
    validators?: ValidatorFn[];
    errors: { [key: string]: string };
}
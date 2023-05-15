import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormComponent } from './form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [IonicModule.forRoot(),
        ReactiveFormsModule],
    })
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.fields = [
      {
        formControlName: 'email',
        iconName: 'person-outline',
        type: 'text',
        placeholder: 'Email',
        validators: [Validators.required, Validators.email],
        errors: {
          required: 'El email es requerido.',
          email: 'El email no es válido.',
        },
      },
      {
        formControlName: 'password',
        iconName: 'lock-closed-outline',
        type: 'password',
        placeholder: 'Contraseña',
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(8)],
        errors: {
          required: 'La contraseña es requerida.',
          minlength: 'La contraseña debe tener al menos 5 caracteres.',
          maxlength: 'La contraseña no puede tener más de 8 caracteres.',
        },
      },
    ];
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show be invalid when email incorrect', () => {
    const emailField = component.form.controls['email'];
    emailField.setValue('invalid-email');
    fixture.detectChanges();
    component.submit();
    
    expect(component.form.invalid).toBeTruthy();
  });

  it('should show be invalid when password incorrect', () => {
    component.form.controls['password'].setValue('1234');
    fixture.detectChanges();

    component.submit();

    expect(component.loginError).toBeTruthy();
    expect(component.form.invalid).toBeTruthy();
    expect(component.loginError).toBe(true);
  });

  it('should emit submitEvent with correct values when form is valid', () => {
    component.form.controls['email'].setValue('valid-email@example.com');
    component.form.controls['password'].setValue('Hola1234');

    let emittedValues: { [key: string]: string | boolean } | undefined;
    component.submitEvent.subscribe((values) => {
      emittedValues = values;
    });
    component.submit();

    expect(emittedValues).toEqual({email: 'valid-email@example.com', password: 'Hola1234'});
  });

  it('should emit submitEvent with incorrect values when form is invalid', () => {
    component.form.controls['email'].setValue('invalid-email');
    component.form.controls['password'].setValue('Hola1234');

    let emittedValues: { [key: string]: string | boolean } | undefined;
    component.submitEvent.subscribe((values) => {
      emittedValues = values;
    });
    component.submit();

    //event not emitted
    expect(emittedValues).toBeUndefined()
  });

  it('should return an empty string for a email without errors', () => {
    component.form.controls['email'].setErrors(null);
    const errorMessage = component.getErrorMessage(component.fields[0]);

    expect(errorMessage).toEqual('');
  });

  it('should return correct error message for a email with errors', () => {
    component.form.controls['email'].setValue('invalid-email');
    const errorMessage = component.getErrorMessage(component.fields[0]);

    expect(errorMessage).toEqual('El email no es válido.');
  });

  it('should return correct error message for a form with required', () => {
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    fixture.detectChanges();

    const errorMessage = component.getErrorMessage(component.fields[0]);

    expect(component.form.invalid).toBeTruthy();
    expect(errorMessage).toEqual('El email es requerido.', 'La contraseña es requerida.');
  });

  it('should show error message when email field is null and loginError is true', () => {
    const emailField = component.form.controls['email'];
    emailField.setValue('');
    component.loginError = true;
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage.textContent.trim()).toBe('El email es requerido.');
  });

  it('should not show error message when email field is valid', () => {
    const emailField = component.form.controls['email'];
    emailField.setValue('ivalid-email@example.com');
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeFalsy();
  });

  it('should not show error message when form is valid', () => {
    component.form.setValue({
      email: 'valid-email@example.com',
      password: 'valid-password',
    });
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeFalsy();
  });

});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormComponent } from './form.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
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

  it('should show error message when email field is invalid and loginError is true', () => {
    const emailField = component.form.controls['email'];
    emailField.setValue('invalid-email');
    component.loginError = true;
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage.textContent.trim()).toBe('El email no es válido.');
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

  it('should not emit submitEvent when form is invalid and submit button is clicked', () => {
    spyOn(component.submitEvent, 'next');
    component.form.setValue({
      email: 'valid-email@example.com',
      password: 'valid-password',
    });
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    expect(component.submitEvent.next).not.toHaveBeenCalled();
  });

  it('should emit login event when form is valid and submit button is clicked', () => {
    spyOn(component, 'submit');
    component.form.setValue({
      email: 'valid-email@example.com',
      password: 'valid-password',
    });
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.submit).toHaveBeenCalled();
  });
});

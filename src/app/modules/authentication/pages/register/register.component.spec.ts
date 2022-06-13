import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthenticationService: any
  let mockNotificationService: any

  beforeEach(async () => {
    mockAuthenticationService = {
      register() { }
    }

    mockNotificationService = {
      showMessageSuccess() { }
    }
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        {
          provide: AuthenticationService,
          useValue: mockAuthenticationService
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined a register form with name, email, password and confirmPassword', () => {
    const form = component.registerForm

    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    const confirmPassword = form.get('confirmPassword')

    expect(name).toBeTruthy()
    expect(email).toBeTruthy()
    expect(password).toBeTruthy()
    expect(confirmPassword).toBeTruthy()
  })

  it('should not validate a form if password and confirmPassord are differente', () => {
    const form = component.registerForm

    const password = form.get('password')
    const confirmPassword = form.get('confirmPassword')

    password?.setValue('12345678')
    confirmPassword?.setValue('87654321')

    expect(form.valid).toBeFalse()
  })

  it('should register a valid user', (done: DoneFn) => {
    const form = component.registerForm

    spyOn(mockAuthenticationService, 'register').and.returnValue({ subscribe: () => { } })
  
    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    const confirmPassord = form.get('confirmPassword')

    name?.setValue('david')
    email?.setValue('david@mail.com')
    password?.setValue('12345678')
    confirmPassord?.setValue('12345678')

    component.register()

    expect(mockAuthenticationService.register).toHaveBeenCalledTimes(1)
    expect(mockAuthenticationService.register).toHaveBeenCalledWith('david', 'david@mail.com', '12345678')
    done()
  })
});

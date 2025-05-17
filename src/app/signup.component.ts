import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-hero-bg d-flex align-items-center justify-content-center flex-wrap">
      <div class="login-hero-text animate__animated animate__fadeInLeft">
        <h1 class="display-5 fw-bold mb-3">Create Your Account</h1>
        <p class="lead mb-4">Join TripEase to book flights, hotels, and packages with exclusive offers and seamless experience.</p>
        <div class="animated-plane-container animate__animated animate__fadeIn animate__delay-1s">
          <div class="animated-cloud cloud-1"></div>
          <div class="animated-cloud cloud-2"></div>
          <div class="animated-plane">
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect x="10" y="25" width="80" height="10" rx="5" fill="#0d6efd"/>
                <polygon points="90,30 110,20 110,40" fill="#38bdf8"/>
                <rect x="15" y="28" width="10" height="4" rx="2" fill="#fff"/>
                <rect x="30" y="28" width="10" height="4" rx="2" fill="#fff"/>
                <rect x="45" y="28" width="10" height="4" rx="2" fill="#fff"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="login-card animate__animated animate__fadeInUp animate__delay-1s">
        <h2 class="title">Sign Up</h2>
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Email</label>
            <input formControlName="email" type="email" class="form-control" placeholder="Enter your email" />
            <div *ngIf="signupForm.get('email')?.invalid && signupForm.get('email')?.touched" class="error">
              Valid email is required.
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <div class="input-group">
              <input formControlName="password" [type]="hidePassword ? 'password' : 'text'" class="form-control" placeholder="Create a password" />
              <button type="button" (click)="hidePassword = !hidePassword" class="toggle-password input-group-text">
                <span [ngClass]="hidePassword ? 'bi-eye' : 'bi-eye-slash'"></span>
              </button>
            </div>
            <div *ngIf="signupForm.get('password')?.invalid && signupForm.get('password')?.touched" class="error">
              Password is required (min 6 chars).
            </div>
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <input formControlName="confirmPassword" [type]="hidePassword ? 'password' : 'text'" class="form-control" placeholder="Confirm your password" />
            <div *ngIf="signupForm.errors && signupForm.errors['mismatch'] && signupForm.get('confirmPassword')?.touched" class="error">
              Passwords must match.
            </div>
          </div>
          <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
          <button type="submit" class="login-btn animate__animated animate__pulse animate__infinite" [disabled]="signupForm.invalid">Sign Up</button>
        </form>
        <div class="text-center mt-3 animate__animated animate__fadeIn animate__delay-2s">
          <span>Already have an account?</span>
          <a routerLink="/login" class="text-primary fw-bold ms-1">Login</a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(form: FormGroup) {
    const pw = form.get('password')?.value;
    const cpw = form.get('confirmPassword')?.value;
    return pw === cpw ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // TODO: Replace with real signup logic
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }
}

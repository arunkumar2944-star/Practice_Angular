import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// ... keep your previous passwordStrengthValidator here ...

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Control here represents the parent FormGroup
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // Do not flag an error if fields are still empty
    if (!password || !confirmPassword) {
      return null;
    }

    // Return error if they do not match
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Regex breakdown:
    // (?=.*[0-9])        - At least one number
    // (?=.*[a-zA-Z])     - At least one character (letter)
    // (?=.*[!@#$%^&*])   - At least one special character
    const hasNumber = /(?=.*[0-9])/.test(value);
    const hasChar = /(?=.*[a-zA-Z])/.test(value);
    const hasSpecial = /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/.test(value);

    const passwordValid = hasNumber && hasChar && hasSpecial;

    // Return an error object if invalid, or null if the password passes all checks
    return !passwordValid ? { passwordStrength: true } : null;
  };
}

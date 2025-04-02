import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent {
  formularioRegister: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.formularioRegister = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  register(): void {
    if (this.formularioRegister.invalid) {
      this.formularioRegister.markAllAsTouched();
      return;
    }

    // Llama al servicio para registrar al usuario
    this.userService.addUser(this.formularioRegister.value).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        alert('Usuario registrado exitosamente.');
        this.formularioRegister.reset();
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un error al registrar el usuario.');
      }
    });
  }
}
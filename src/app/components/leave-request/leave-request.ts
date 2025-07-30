import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveRequestService } from '../../services/leave-request';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leave-request.html',
  styleUrl: './leave-request.css',
})
export class LeaveRequestComponent {
  leaveForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveRequestService,
    private http: HttpClient
  ) {
    this.leaveForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      reason: [''],
      employeeId: [''],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitLeave(): void {
  if (this.leaveForm.invalid) {
    alert('Please complete all fields before submitting.');
    return;
  }

  this.leaveService.submitLeave(this.leaveForm.value).subscribe({
    next: (res: any) => {
      // File upload is disabled for now
      alert('Leave request submitted successfully!');
      this.leaveForm.reset();
      this.selectedFile = null; // Reset selected file if any
    },
    error: (err) => {
      console.error('Leave submission error:', err);
      alert('Error submitting leave request.');
    }
  });
}

}

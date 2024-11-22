import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent {
  constructor(private http: HttpClient) {}

  uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const formData = new FormData();
      formData.append('file', input.files[0]);

      this.http.post('https://dashboard.vectordb.app/api/update-db/', formData)
        .subscribe({
          next: (response) => {
            console.log('Upload successful:', response);
          },
          error: (error) => {
            console.error('Error during upload:', error);
          }
        });
    }
  }
}

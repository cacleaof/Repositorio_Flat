import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doc-form',
  standalone: false,
  templateUrl: './doc-form.component.html',
  styleUrl: './doc-form.component.css'
})
export class DocFormComponent implements OnInit {

  newDoc = { doc: '', status: '' };
  message: string | null = null;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.message = null;
    this.error = null;

    this.http.post('http://localhost:3000/api/docs', this.newDoc)
      .subscribe({
        next: (response: any) => {
          this.message = response.message;
          this.newDoc = { doc: '', status: '' }; // Limpa o formulário
        },
        error: (err) => {
          this.error = 'Ocorreu um erro ao adicionar o documento.';
          console.error(err);
        }
      });
  }

}

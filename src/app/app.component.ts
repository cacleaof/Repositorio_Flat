import { Component } from '@angular/core';
import Doc_json from '../DB_Json/repo_doc.json';

interface Docs {
  id: number;
  href: string;
  doc: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  docs: Docs[] = Doc_json;
}

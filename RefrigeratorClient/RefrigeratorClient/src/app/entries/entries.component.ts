import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement } from '../interfaces/EntryElement';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  displayedColumns: string[] = ["Category","Description","IsExpense","Quantitative","Unit"] ;
  dataSource;

  constructor(private service:EntryService ) { }

  ngOnInit(): void {
    
    this.service.getAll().subscribe((data) => { 
      console.log('Result - ', data);

      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);    

    });

  }

}

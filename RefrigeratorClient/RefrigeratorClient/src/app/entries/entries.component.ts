import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement } from '../interfaces/EntryElement';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  displayedColumns: string[] = ["Category","Description","IsExpense","Quantitative","Unit", "Actions"] ;
  dataSource;

  constructor(private service:EntryService, private dialog:MatDialog ) { 

  }

  ngOnInit(): void {    
    this.service.getAll().subscribe((data) => { 
      console.log('Result - ', data);
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]); 
    });
  }

  // update an entry
  updateEntry(entry){
    console.log(entry);
    this.dialog.open(UpdateEntryComponent, {
      data:{
        Id:entry.Id,
        Category:entry.Category,
        Description:entry.Description,
        IsExpense:entry.IsExpense,
        Value:entry.Value,
        Unit:entry.Unit
      }
    });
  }

  deleteEntry(entry){
    console.log(entry);
    
  }

}

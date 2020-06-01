import { Component, OnInit, ViewChild } from '@angular/core';
import { EntryService } from '../entry.service';
import { MatTableDataSource } from '@angular/material/table';
import { EntryElement } from '../interfaces/EntryElement';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent implements OnInit {

  displayedColumns: string[] = ["Category","Description","IsExpense","Quantitative","Unit", "Actions"] ;
  dataSource;

  // children views
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  // constructor
  constructor(private service:EntryService, private dialog:MatDialog ,private router:Router) { }

  
  ngOnInit(): void {    
    this.service.getAll().subscribe((data) => { 
      console.log('Result - ', data);
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]); 
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    this.service.deleteEntry(entry).subscribe((data:any) => { }, (err) => alert(err.error.Message));
    // refresh list after deleting an item   
     
    this.router.navigate(['/entries'])
 
  };

}



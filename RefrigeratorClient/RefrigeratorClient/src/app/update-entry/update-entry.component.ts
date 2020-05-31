import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';


@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css']
})
export class UpdateEntryComponent implements OnInit {

  form:FormGroup;
  id:number;

  constructor(private fb:FormBuilder, 
              private dialogRef:MatDialogRef<UpdateEntryComponent>, 
              @Inject(MAT_DIALOG_DATA) {Category,Description,IsExpense,Value,Unit,Id},
              private sevice:EntryService) { 
                // retrieve id of current entry
                this.id = Id;
                this.form = fb.group({
                  category: [Category, Validators.required],
                  description: [Description, Validators.required],
                  isExpense: [IsExpense, Validators.required],
                  value: [Value, Validators.required],
                  unit: [Unit, Validators.required],
                });
              }

  types : Type[] = [
    {value:true, display:'Expense'},
    {value:false, display:'Income'},
  ]

  ngOnInit(): void {
  }
  // save updates
  save(){
    // registre id of entry
    this.form.value.id = this.id;
    this.sevice.updateEntry(this.id, this.form.value).subscribe((data)=> {
      if(data == 'Ok') this.close();      
      else window.alert("Something went wrong, please check the console");     
    });
  }
  close(){
    this.dialogRef.close();
  }

}

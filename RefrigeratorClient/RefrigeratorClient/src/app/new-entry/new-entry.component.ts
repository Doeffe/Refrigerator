import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Type } from '../interfaces/Type';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.css']
})
export class NewEntryComponent {

  // logic for isexpense
  types : Type[] = [
    {value:true, display:'Expense'},
    {value:false, display:'Income'},
  ]

  constructor(private service:EntryService) { }

  // form control setup
  entryForm = new FormGroup({    
    category: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    isExpense: new FormControl('',Validators.required),
    value: new FormControl('',[ Validators.required, Validators.pattern('\\d+\\.?\\d*') ]),
    unit: new FormControl('',  Validators.required),
  });


  onSubmit(){  
    // create entry
    this.service.createEntry(this.entryForm.value).subscribe((data) => {
      console.log('Data -', data);
    });
  }

}

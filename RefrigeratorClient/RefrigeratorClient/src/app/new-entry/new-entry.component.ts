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

  // dropdown enums
  categories = EntityCategory;
  unitTypes = UnitType;
  // keys selector
  keys = Object.keys;



  constructor(private service:EntryService) {}   

  // form control setup
  entryForm = new FormGroup({    
    category: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    isExpense: new FormControl('',Validators.required),
    value: new FormControl('',[ Validators.required, Validators.pattern('\\d+\\.?\\d*') ]),
    unit: new FormControl('',  Validators.required),
    price: new FormControl('',Validators.pattern('\\d+\\.?\\d*')),
  });  

  // submit new entry
  onSubmit(){ 

    if (!this.entryForm.valid) return;

    // create entry        
    this.service.createEntry(this.entryForm.value).subscribe((data) => {
      console.log('Data -', data);
    }); 
  }

  increment(){     
    this.entryForm.value.value = ++this.entryForm.value.value;
  }
  decrement(){    
    if(this.entryForm.value.value < 1)
      return; 
    this.entryForm.value.value = --this.entryForm.value.value; 
  }
}

// enums 
// catogories
export enum EntityCategory{
  Dairy = "Dairy",
  Butcher = "Butcher",
  FruitVegetables = "Fruit and vegetables",
  OtherFoods = "Other foods",
  CleaningProducts = "Cleaning products",
  OtherHouseholds = "Other households",
  PersonalCare = "Personal care",
  ResidentialGarden = "Residential and garden" ,
};

// unit types
export enum UnitType{
  ml = "ml",
  cl= "cl",
  dl= "dl",
  l= "l",
  stk= "stk",
  pk= "pk",
  gr= "gr",
  kg= "kg",
};
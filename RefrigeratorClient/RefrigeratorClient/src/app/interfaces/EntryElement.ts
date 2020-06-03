import { EntityCategory, UnitType } from '../new-entry/new-entry.component';

export interface EntryElement{    
    Category:EntityCategory;
    Description:string;
    IsExpense:boolean;
    Value:number;
    Unit:UnitType;
    Price:number;
}
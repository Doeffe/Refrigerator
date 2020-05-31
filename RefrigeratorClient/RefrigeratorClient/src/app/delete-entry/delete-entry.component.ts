import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-delete-entry',
  templateUrl: './delete-entry.component.html',
  styleUrls: ['./delete-entry.component.css']
})
export class DeleteEntryComponent implements OnInit {

  constructor(private route:ActivatedRoute, private service:EntryService , private router:Router) { }

  entry={
    category:'',
    description:'',
    isExpense:false,
    value:0,
    unit:''
  };

  id;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getEntry(this.id).subscribe((data:any)=> {
      console.log('data - ', data);

      // assign data from db to view object
      this.entry.category = data.Category;
      this.entry.description = data.Description;
      this.entry.isExpense = data.IsExpense;
      this.entry.value = data.Value;
      this.entry.unit = data.Unit;

      // get id
      this.id = data.Id;  
    });
  }

  cancel(){
    this.router.navigate(['/'])
  }

  confirm(){
    this.service.deleteEntry(this.id).subscribe((data)=> {
      console.log('data - ', data);
    });
    this.router.navigate(['/']);
  }

}

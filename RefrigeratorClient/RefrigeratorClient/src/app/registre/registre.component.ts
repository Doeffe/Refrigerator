import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})

export class RegistreComponent {

  registreForm :FormGroup;

  constructor(private fb:FormBuilder, private service:AuthService, private router:Router) { 

    this.registreForm = fb.group({
     
      username : ['',Validators.required],
      password : ['',Validators.required],
      cPassword : ['',Validators.required]
    }, {validator : matchingFields('password','cPassword')}); 

  }

  onSubmit(){
    // delete confirmation
    delete this.registreForm.value.cPassword;

    // registre user to service
    this.service.registre(this.registreForm.value).subscribe((data:any) => {

      // store token and username locally
      localStorage.setItem('username', data.Username);
      localStorage.setItem('token', data.Token);

      // redirect to frontpage
      this.router.navigate(['']);
    });
  }

}

function matchingFields(arg1, arg2){  
  return form => {
    let valArg1 = form.controls[arg1].value;
    let valArg2 = form.controls[arg2].value;
    console.log('hej - ',valArg1);

    if(valArg1 !==  valArg2) 
      return {matchingFields: true }
  } 
}

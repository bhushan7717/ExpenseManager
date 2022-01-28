import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ExpenseEntryService } from '../expense-entry.service';
import { ExpenseEntry } from '../expense-entry/expense-entry';


@Component({
  selector: 'app-edit-entry',
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {
  id:number;
  item:string;
  amount : number;
  category : string;
  location : string;
  spendOn : Date;

  formdata : FormGroup;
  selectedId  : number;
  expenseEntry : ExpenseEntry;

  constructor(private expenseEntryService : ExpenseEntryService, private router : Router
    , private route : ActivatedRoute) { }

  ngOnInit(): void {
       this.formdata = new FormGroup({
          id : new FormControl(),
          item : new FormControl('', [Validators.required]),
          amount : new FormControl('', [Validators.required]),
          category : new FormControl(),
          location : new FormControl(),
          spendOn : new FormControl()
       });

       this.selectedId = Number(this.route.snapshot.paramMap.get('id'));

       if(this.selectedId != null && this.selectedId != 0){
         this.expenseEntryService.getExpenseEntry(this.selectedId)
         .subscribe((data) => {

           this.expenseEntry = data;
           this.formdata.controls['id'].setValue(this.expenseEntry.id);
           this.formdata.controls['item'].setValue(this.expenseEntry.item);
           this.formdata.controls['amount'].setValue(this.expenseEntry.amount);
           this.formdata.controls['category'].setValue(this.expenseEntry.category);
           this.formdata.controls['location'].setValue(this.expenseEntry.location);

         })
       }
  }
  get itemValue(){
    return this.formdata.get('item');
  }
  get amountValue(){
    return this.formdata.get('amount');
  }
  onClickSubmit(data : any){
    console.log('onClickSubmit fired');
    this.id = data.id;
    this.item = data.item;
    this.amount = data.amount;
    this.category = data.category;
    this.location = data.location;
    this.spendOn = data.spendOn;

  let expenseEntry : ExpenseEntry = {
        id : this.id,
        item : this.item,
        amount : this.amount,
        category : this.category,
        location : this.location,
        spendOn : this.spendOn,
        createdOn : new Date(2022,1,1)
  }
  console.log(expenseEntry);

  if(expenseEntry.id == null || expenseEntry.id == 0){
    console.log('add fn fired.');
    this.expenseEntryService.addExpenseEntry(expenseEntry).subscribe(data => {
      console.log(data);
      this.router.navigate(['/expenses']);
    });
  }
  else{
    console.log('Edit fn fired.');
    this.expenseEntryService.updateExpenseEntry(expenseEntry).subscribe(data => {
      console.log(data);
      this.router.navigate(['/expenses']);
    });
  }
}
}

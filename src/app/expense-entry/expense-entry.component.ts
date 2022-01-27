import { Component, OnInit } from '@angular/core';
import { ExpenseEntry  } from './expense-entry';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-expense-entry',
  templateUrl: './expense-entry.component.html',
  styleUrls: ['./expense-entry.component.css']
})
export class ExpenseEntryComponent implements OnInit {
  title : string;
  expenseEntry$ : Observable<ExpenseEntry>;
  expenseEntry: ExpenseEntry = {} as ExpenseEntry;
  selectedID : number;

  constructor(private restService : ExpenseEntryService, private router : Router
    , private route : ActivatedRoute  ) { 
      
    }

  ngOnInit(): void {
      this.title = "Expense entry";
      this.expenseEntry$ = this.route.paramMap.pipe(switchMap(param =>{
        this.selectedID = Number(param.get('id'));
        return this.restService.getExpenseEntry(this.selectedID);       
      }
        ));

        this.expenseEntry$.subscribe(data => this.expenseEntry = data);

      // this.expenseEntry$ = {
      //           id : 1,
      //           item : "Pizza",
      //           amount : 21,
      //           category : "Food",
      //           location : "Zomato",
      //           spendOn : new Date(2020, 6, 1, 10, 10, 10),
      //           createdOn : new Date(2021, 6, 1, 10, 10, 10)
      // };
  }

}

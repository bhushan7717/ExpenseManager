import { Component, OnInit } from '@angular/core';
import { ExpenseEntry } from '../expense-entry/expense-entry';
import { DebugService } from '../debug.service';
import { ExpenseEntryService } from '../expense-entry.service';

@Component({
  selector: 'app-expense-entry-list',
  templateUrl: './expense-entry-list.component.html',
  styleUrls: ['./expense-entry-list.component.css'],
  providers: [DebugService, ExpenseEntryService]
})
export class ExpenseEntryListComponent implements OnInit {
  title : string;
  expenseEntryList :  any;
  constructor(private debugService : DebugService, private restService : ExpenseEntryService) {

   }

  ngOnInit(): void {
      this.title = "Expense entry list";
      this.expenseEntryList = this.getexpenseentrylist();
      this.debugService.info("Expense entry list initialize.");
  }
  getexpenseentrylist() {

   return this.restService.getExpenseEntries().subscribe(data => this.expenseEntryList = data);
      // let entries : ExpenseEntry[] = [
      //   { id: 1, 
      //     item: "Pizza", 
      //     amount: Math.floor((Math.random() * 10) + 1), 
      //     category: "Food", 
      //     location: "Mcdonald", 
      //     spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10), 
      //     createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) }, 
      //  { id: 1, 
      //     item: "Pizza", 
      //     amount: Math.floor((Math.random() * 10) + 1), 
      //     category: "Food", 
      //     location: "KFC", 
      //     spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10), 
      //     createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) }, 
      //  { id: 1,
      //     item: "Pizza",
      //     amount: Math.floor((Math.random() * 10) + 1), 
      //     category: "Food", 
      //     location: "Mcdonald", 
      //     spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10), 
      //     createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) }, 
      //  { id: 1, 
      //     item: "Pizza", 
      //     amount: Math.floor((Math.random() * 10) + 1), 
      //     category: "Food", 
      //     location: "KFC", 
      //     spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10), 
      //     createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) }, 
      //  { id: 1, 
      //     item: "Pizza", 
      //     amount: Math.floor((Math.random() * 10) + 1), 
      //     category: "Food", 
      //     location: "KFC", 
      //     spendOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10), 
      //     createdOn: new Date(2020, 4, Math.floor((Math.random() * 30) + 1), 10, 10, 10) 
      //  }, 
      // ];
      
  }
}

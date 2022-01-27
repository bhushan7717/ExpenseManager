import { Injectable } from '@angular/core';
import { ExpenseEntry } from './expense-entry/expense-entry';
import { Observable, throwError, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseEntryService {
  private expenseEntryUrl = 'https://localhost:7263/ExpenseEntry';

  private httpOptions = {
    headers : new HttpHeaders({ 'Content-Type' : 'application/json' })
  };

  constructor(private httpclient : HttpClient) {

   }

   getExpenseEntries() : Observable<ExpenseEntry[]>{
     return this.httpclient.get<ExpenseEntry[]>(this.expenseEntryUrl, this.httpOptions).pipe(retry(3)
     , catchError(this.httpErrorHandler));
   }

   addExpenseEntry(expenseentry : ExpenseEntry) : Observable<ExpenseEntry> {
     return this.httpclient.post<ExpenseEntry>(this.expenseEntryUrl, expenseentry, this.httpOptions)
     .pipe(retry(3), catchError(this.httpErrorHandler));
   }
   updateExpenseEntry(expenseentry : ExpenseEntry) : Observable<ExpenseEntry> {
    return this.httpclient.put<ExpenseEntry>(this.expenseEntryUrl, expenseentry, this.httpOptions)
    .pipe(retry(3), catchError(this.httpErrorHandler));
  }
  deleteExpenseEntry(expenseEntry : ExpenseEntry | number) : Observable<ExpenseEntry> {
    const id = typeof expenseEntry == 'number' ? expenseEntry : expenseEntry.id
    const url = `${this.expenseEntryUrl}/${id}`;
    return this.httpclient.delete<ExpenseEntry>(this.expenseEntryUrl, this.httpOptions)
    .pipe(retry(3), catchError(this.httpErrorHandler));
  }

   private httpErrorHandler(error : HttpErrorResponse){
     if(error.error instanceof ErrorEvent){
       console.log('A client side error occur. The error message is : '+ error.message);
     }
     else{
       console.error('An error happened in server. Http status code is ' + error.status + ' and error returned is '+ error.message);

     }
     return throwError("Error occured. Please try again.");
   }
}

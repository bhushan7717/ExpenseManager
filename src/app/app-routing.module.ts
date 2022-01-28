import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { ExpenseEntryListComponent } from './expense-entry-list/expense-entry-list.component';
import { ExpenseEntryComponent } from './expense-entry/expense-entry.component';
import { ExpenseGuard } from './expense.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'expenses', component : ExpenseEntryListComponent, canActivate: [ExpenseGuard] },
  { path: 'login', component : LoginComponent },
  { path: 'logout', component : LogoutComponent },
  { path: 'expenses/edit/:id', component : EditEntryComponent },
  { path: 'expenses/details/:id', component : ExpenseEntryComponent, canActivate: [ExpenseGuard]  },
  { path : '', redirectTo : 'expenses', pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

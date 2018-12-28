import { LoginComponent } from './auth/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatIconModule, MatHint, MatTableModule, MatMenuModule, MatSnackBar, MatListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSortModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { StudentBuilderComponent } from './student-builder/student-builder.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { SignupComponent } from './auth/signup/signup.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { AuthInterceptor } from './auth/auth-interceptor';



import { StudentlistComponent } from './studentlist/studentlist.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentBuilderComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    StudentlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule,
    HttpModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule
    






  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// import { PostListComponent } from "./posts/post-list/post-list.component";
// import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { StudentlistComponent } from "./studentlist/studentlist.component";
import { StudentBuilderComponent } from "./student-builder/student-builder.component";

const routes: Routes = [
    // { path: "", component: PostListComponent },
    // { path: "create", component: PostCreateComponent },
    { path: "create", component: StudentBuilderComponent ,canActivate:[AuthGuard]},
    { path: "edit/:id", component: StudentBuilderComponent ,canActivate:[AuthGuard]},
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "list", component: StudentlistComponent,canActivate:[AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers:[AuthGuard]
})
export class AppRoutingModule { }

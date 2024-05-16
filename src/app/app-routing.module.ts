import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { UsersComponent } from "./users/users.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'auth', component: AuthComponent},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'registry', component: RegisterComponent },
    { path: 'users', component: UsersComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
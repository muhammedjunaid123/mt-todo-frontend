import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { isNotLoginGuard } from './guard/isNotLogin/is-not-login.guard';
import { isLoginGuard } from './guard/isLogin/is-login.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: "login", component: LoginComponent, canActivate: [isNotLoginGuard] },
  { path: "register", component: RegisterComponent, canActivate: [isNotLoginGuard] },
  { path: 'home', component: HomeComponent, canActivate: [isLoginGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [isLoginGuard] },
  {path :'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

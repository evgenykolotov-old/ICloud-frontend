import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from 'src/app/modules/authorization/authorization.component';
import { DiskComponent } from 'src/app/modules/disk/disk.component';
import { RegistrationComponent } from 'src/app/modules/registration/registration.component';
import { LaodFilesGuard } from '../guards/load-files.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DiskComponent,
    canActivate: [LaodFilesGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: AuthorizationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

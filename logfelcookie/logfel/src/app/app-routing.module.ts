import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { UcfComponent } from './view/ucf/ucf.component';
import { SignupComponent } from './view/signup/signup.component';
import { SlGuard } from './guard/sl.guard';
import { NlGuard } from './guard/nl.guard';
import { PoliticaPrivacidadComponent } from './view/politica-privacidad/politica-privacidad.component';
import { PagoComponent } from './view/pago/pago.component';
import { SuscripcionComponent } from './view/suscripcion/suscripcion.component';
import { EmpresaComponent } from './view/empresa/empresa.component';
import { RenovarSuscripcionComponent } from './view/renovar-suscripcion/renovar-suscripcion.component';

const routes: Routes = [
  
  {path: '', component:LoginComponent,canActivate:[SlGuard]},
  {path: 'login', component:LoginComponent,canActivate:[SlGuard]},
  {path: 'ucf', component:UcfComponent,canActivate:[NlGuard]},
  {path: 'signup', component:SignupComponent,canActivate:[SlGuard]},
  {path: 'polpiv', component:PoliticaPrivacidadComponent,canActivate:[SlGuard]},
  {path: 'pago', component:PagoComponent,canActivate:[SlGuard]},
  {path: 'suscripcion', component:SuscripcionComponent,canActivate:[NlGuard]},
  {path: 'empresa',component:EmpresaComponent,canActivate:[NlGuard]},
  {path: 'renovar-suscripcion',component:RenovarSuscripcionComponent,canActivate:[NlGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

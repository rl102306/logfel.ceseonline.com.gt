import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './view/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'
import { HttpClientModule } from '@angular/common/http';
import { UcfComponent } from './view/ucf/ucf.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { HeaaderComponent } from './view/heaader/heaader.component';
import { SignupComponent } from './view/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { PoliticaPrivacidadComponent } from './view/politica-privacidad/politica-privacidad.component';
import { PagoComponent } from './view/pago/pago.component';
import { SuscripcionComponent } from './view/suscripcion/suscripcion.component';
import { PexComponent } from './view/pex/pex.component';
import { PreComponent } from './view/pre/pre.component';
import { EmpresaComponent } from './view/empresa/empresa.component';
import {DatePipe} from '@angular/common';
import { RenovarSuscripcionComponent } from './view/renovar-suscripcion/renovar-suscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UcfComponent,
    HeaaderComponent,
    SignupComponent,
    PoliticaPrivacidadComponent,
    PagoComponent,
    SuscripcionComponent,
    PexComponent,
    PreComponent,
    EmpresaComponent,
    RenovarSuscripcionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    PdfJsViewerModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

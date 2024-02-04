import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Interceptor
import { TokenInterceptorInterceptor } from './interceptors/token-interceptor.interceptor';

// HttpModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Service and Guard
import { AuthService } from './services/auth.service';
import { ConstantService } from './services/constant.service';
import { AuthGuard } from './auth/auth.guard';

// Form Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Chart JS
import { ChartModule } from 'angular2-chartjs';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontendLayoutComponent } from './layouts/frontend-layout/frontend-layout.component';
import { BackendLayoutComponent } from './layouts/backend-layout/backend-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './pages/frontend/home/home.component';
import { AboutComponent } from './pages/frontend/about/about.component';
import { ContactComponent } from './pages/frontend/contact/contact.component';
import { DashboardComponent } from './pages/backend/dashboard/dashboard.component';
import { StockComponent } from './pages/backend/stock/stock.component';
import { ReportComponent } from './pages/backend/report/report.component';
import { UsersComponent } from './pages/backend/users/users.component';
import { SettingComponent } from './pages/backend/setting/setting.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgotpassComponent } from './pages/auth/forgotpass/forgotpass.component';
import { HeaderFrontendComponent } from './shared/frontend/header-frontend/header-frontend.component';
import { FooterFrontendComponent } from './shared/frontend/footer-frontend/footer-frontend.component';
import { HeaderBackendComponent } from './shared/backend/header-backend/header-backend.component';
import { FooterBackendComponent } from './shared/backend/footer-backend/footer-backend.component';
import { SidebarBackendComponent } from './shared/backend/sidebar-backend/sidebar-backend.component';

@NgModule({
  declarations: [
    AppComponent,
    FrontendLayoutComponent,
    BackendLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    StockComponent,
    ReportComponent,
    UsersComponent,
    SettingComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpassComponent,
    HeaderFrontendComponent,
    FooterFrontendComponent,
    HeaderBackendComponent,
    FooterBackendComponent,
    SidebarBackendComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [
    AuthService, 
    ConstantService, 
    AuthGuard, 
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorInterceptor, 
      multi: true 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

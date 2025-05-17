import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { FlightsComponent } from './flights.component';
import { HotelsComponent } from './hotels.component';
import { PackagesComponent } from './packages.component';
import { OffersComponent } from './offers.component';
import { NotFoundComponent } from './not-found.component';
import { SignupComponent } from './signup.component';
import { DestinationsComponent } from './destinations.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'destinations', component: DestinationsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

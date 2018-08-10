import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { NewsModule } from './components/news/news.module';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';

import { NavigationComponent } from './components/navigation/navigation.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";

export function getToken() {
  return localStorage.getItem('access_token');
}

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1034509024901-65gd2i8fdlqqnik57dsia2e3in30gub6.apps.googleusercontent.com")
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider("Facebook-App-Id")
  // },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavigationComponent,
  ],
  imports: [
    NgbModule.forRoot(),

    BrowserModule,
    FormsModule,

    SocialLoginModule,

    AuthModule,
    NewsModule,
    UserModule,

    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        // whitelistedDomains: ['localhost:3001'],
        // blacklistedRoutes: ['localhost:3001/auth/'],
      }
    }),

    AppRoutingModule,
  ],
  providers: [ 
    CookieService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }

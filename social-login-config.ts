import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";

export function getSocialAuthServiceConfigs() {
    let config = new AuthServiceConfig(
    	[
	    	{
		        id: GoogleLoginProvider.PROVIDER_ID,
		        provider: new GoogleLoginProvider("1034509024901-65gd2i8fdlqqnik57dsia2e3in30gub6.apps.googleusercontent.com")
	    	}
	    ]
    );
    
    return config;
}
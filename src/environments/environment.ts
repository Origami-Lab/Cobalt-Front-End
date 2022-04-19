// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gatewayBaseUrl: 'https://api.cobalt-dev.origamilab.ch/',
  padUrl: 'https://etherpad.cobalt.origamilab.ch/api/1/',
  authToken: {
    name: 'co_token'
  },
  apiKey: '73e75ae01759d9312f5f6eb7ebb0efb0f3e8af52025dc8cdd508bbeea1de6290',
  padGroupId: 'g.at3YEpNez6r2svU5'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

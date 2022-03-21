
React Client for FSH

Typescript/ Mobx / MUI / Axios / Formik 


To install

```
npm install
npm start
```

IMPORTANT:
You must add CORS permissions for the React client in FSH web api in order for things to work. There are three things to add in the FSH web api code:

1. In configuration cors.json, 
-- "React": "http://localhost:3000"
3. In FSH.Application.Settings
-- public string React { get; set; }
5. In FSH.Infrastructure.Common.Extensions.CorsExtensions 
-- corsSettings.React


Note:
Updating a user will not work because it relies on code that was added to FSH outside of the main project

# What is that

- Looks for user position ( mobile or desktop )  
- presents leaflet map  
- adds array of markers  


# Install maps 

1. **bower install** manviny/manviny.maps --save  
2. check that all js and css libraries are loaded  
3. **inject** 'manviny.dreamfactory' into your app module  
4. **add** '','' to your controller  
5. start using it  



# Needed
```js
# app.js
angular.module('your-app', [..., 'ngMaterial','manviny.maps', ...])

```

var express = require("express");
var app = express();

var fastFalcor = require("../lib/fast-falcor");

var dataObject = {
  id:"john_doe",
  name: {
    first:"John",
    last:"Doe"
  },
  relatives:[
    {
      id:"jane_doe"
    }
  ]
}

var dataService = {getData:function({rawDataRoute, route, params, resolve, reject}){
  resolve(dataObject);
}}

var dataRoute = "users[{keys:id}]"

var dataObjectsToRoutes = [{dataRoute, dataObject, dataService, expires:-10}];
fastFalcor({dataObjectsToRoutes, expressApp:app, apiEndpointPath:"/api", falcorBrowserEndpoint: "/falcor.browser.js"})

app.listen(8080);

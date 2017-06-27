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
  ],
  address:{
    lines:[
      "123 Fake Street",
      "Springfield, IL 55555"
    ]
  }
}

var dataService = {getData:function({rawDataRoute, route, params, requestContext, resolve, reject}){
  if(requestContext.query.authId === "john_doe"){
    resolve(dataObject);
  } else {
    reject(new Error("Not authorized: add authId=john_doe to query string"));
  }
}}

var dataRoute = "users[{keys:id}]"

var dataObjectsToRoutes = [{dataRoute, dataObject, dataService, expires:-10}];
var Router = require('falcor-router');

class MyRouter extends Router{
  constructor(routes, req, res){
    super(routes);
    this.requestContext = req;
  }
}

fastFalcor({routerExtension:MyRouter, dataObjectsToRoutes, expressApp:app, apiEndpointPath:"/api", falcorBrowserEndpoint: "/falcor.browser.js"})

app.listen(8080);

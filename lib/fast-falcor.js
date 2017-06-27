
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var path = require("path");
var apiHandler = require("./api-endpoint-handler");
var fs = require("fs");
var convert =  require("falcor-routes-from-object");

module.exports = function({expressApp, apiEndpointPath, falcorEndpoint, falcorBrowserEndpoint, dataObjectsToRoutes, additionalRoutes, falcorRouteMiddlewares, routerExtension}){
  var routes = convert(dataObjectsToRoutes || []).concat(additionalRoutes || []);
  if(apiEndpointPath){
    var routesArr = [];
    for(var routeObj of routes){
      routesArr.push(routeObj.route);
    }
    expressApp.get(apiEndpointPath, apiHandler(routesArr));
  }
  if(falcorBrowserEndpoint){
    let falcorFile = fs.readFileSync(path.join(__dirname, "falcor.browser.js"), "utf8");
    expressApp.get(falcorBrowserEndpoint, function(req, res){
      res.status(200).set('Content-Type', 'text/javascript').send(falcorFile)
    });
  }

  var fMiddleware = [falcorEndpoint || '/model.json'].concat(falcorRouteMiddlewares || []).concat([falcorExpress.dataSourceRoute(function (req, res) {
    if(routerExtension){
      return new routerExtension(routes, req, res);
    }
    return new Router(routes);
  })])

  expressApp.use.apply(expressApp, fMiddleware);

  return expressApp;
}

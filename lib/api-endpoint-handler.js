
module.exports = function(routesArr){
  routesArr.sort();
  var staticDoc = `<html><head><title>Falcor Routes</title></head><body><h1>Routes</h1>${routesTemplate(routesArr)}</body></html>`;
  return function(req, res){
    res.status(200).send(staticDoc)
  }
}

function routesTemplate(routes){
  return `<ul>${routes.map((route) => {return routeTemplate(route)}).reduce((red, tmpl) => {red += tmpl; return red}, "")}</ul>`
}

function routeTemplate(route){
  return `<li><pre>${route}</pre></li>`
}


var fs = require("fs");
var http = require("http");
/* ⚠️ NO MODIFICAR NADA POR ENCIMA DE ESTA LÍNEA ⚠️ */
/* AQUÍ DEBAJO PUEDES ESCRIBIR LA CONSTANTE DEL PUERTO */
const PORT = 3001;

/* ⚠️ LA LÍNEA SIGUIENTE TIENE QUE QUEDAR COMO ESTÁ PARA PODER EXPORTAR EL SERVIDOR ⚠️ */
module.exports =
  /* AQUÍ DEBAJO YA PUEDES ESCRIBIR TÚ CÓDIGO REEMPLAZANDO EL VALOR DE NULL POR EL SERVIDOR */
http.createServer(function (req, res) {
  
  console.log(`Server raised in port ${PORT}`);
  if (req.url === "/api") {
    fs.readFile("..//01 - Exercises/utils/dogsData.json", function (err, data) {
      if (err) {
        res.writeHead(404, {"Content-type": "text/plain"});
        res.end("json not found");
        return; // Added return here
      }
      
      res.writeHead(200, {"Content-type": "application/json"});
      res.end(data);
    });
    return; // Added return here
  } else if (req.url === "/allDogs") {
    fs.readFile("utils/allDogs.html", "UTF8", function (err, data) {
      if (err) {
        res.writeHead(404, {"Content-type": "text/plain"});
        res.end("html not found");
      } else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(data);
      }
    });
    return; // Added return here
  } else {
    res.writeHead(404, {"Content-type": "text/plain"});
    res.end("Route not found");
  }
})
.listen(PORT, "localhost");
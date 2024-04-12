const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

server.post("/posts", (req, res) => {
    const { author, title, contents } = req.body;
    if (!author || !title || !contents) {
        return res.status(400).json({ error: "No se recibieron los parámetros necesarios para crear la publicación" });
    }
    const id = publications.length + 1;
    const newPublication = {
        id: id,
        author: author,
        title: title,
        contents: contents
    }
    publications.push(newPublication);
    res.status(201).json(newPublication);
})

server.get("/posts", (req, res) => {
    const { author, title } = req.query;
    const autor = req.params.author;
    if (author && title) {
        const filteredPublications = publications.filter((publication) => {
            publication.author === author && publication.title === title
        });
        filteredPublications.length > 0 ?
            res.status(200).json(filteredPublications)
            : res.status(400).json({ error: "No existe ninguna publicación con dicho título y autor indicado" });
    }
})

server.get("/posts/:author", (req, res) => {

    const { author } = req.params;
    const filterAutor = publications.filter(publication =>
        publication.author === author
    );
    filterAutor.length > 0 ?
        res.status(200).json(filterAutor)
        : res.status(404).json({ error: "No existe ninguna publicación del autor indicado", });
})
server.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        return res.status(400).json({error: "No se recibieron los parámetros necesarios para modificar la publicación"});
    };
    if (isNaN(id)||id < 0 || id >= publications.length) {
        return res.status(400).json({error: "No se recibió el id correcto necesario para modificar la publicación"});
    };
    return res.status(200).json(publications);
})

server.delete("/posts/:id", (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({error: "No se recibió el id de la publicación a eliminar"});
    };
    publications.forEach(publication => {
        publication.id === id ? publications.splice(publication, 1) 
        : res.status(400).json({error: "No se recibió el id correcto necesario para eliminar la publicación"});
        return res.status(200).json({ success: true });
    });
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };

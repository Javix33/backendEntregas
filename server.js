const express = require("express");

const MODULO = require("./classContenedor.js")

const PRODUCTO1 = {
    title: "blukie",
    price: 120,
    thumbnail: "https://javix33.github.io/wookie/resources/imagenes/productos/blukie4.jpg"
};
const PRODUCTO2 = {
    title: "Kashyyk blend",
    price: 120,
    thumbnail: "https://javix33.github.io/wookie/resources/imagenes/productos/kashyyyk2.jpg"
};
const PRODUCTO3 = {
    title: "Red trooper",
    price: 120,
    thumbnail: "https://javix33.github.io/wookie/resources/imagenes/productos/red2.jpg"
};
let productos = new MODULO.contenedor("productos.txt");

(async function() {
    await productos.save(PRODUCTO1);
    await productos.save(PRODUCTO2);
    await productos.save(PRODUCTO3);

})();

function getRandom(reference) {
    return Math.floor(Math.random() * reference) + 1;
}


const app = express();

const PORT = 8080;


app.get("/productos", (req, res) => {
    productos.getAll().then(results => res.send(results))

});
app.get("/productoRandom", (req, res) => {
    let idQuest = getRandom(3)
    productos.getById(idQuest).then(results => res.send(results))

});


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
const fs = require("fs")

class contenedor {
    constructor(nombreDeArchivo) {
        this.idAsignado = 1
        this.nombreDeArchivo = nombreDeArchivo
        this.productos = []

    }
    async save(Object) {
        let newObject = {...Object, id: this.idAsignado }
        this.productos.push(newObject)

        try {
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(this.productos, null, 2))
            this.idAsignado++;
            return newObject.id
        } catch (err) { throw new Error("Error al escribir archivo") }


    }
    async getById(id) {
        let element
        try {
            let ProdFile = JSON.parse(await fs.promises.readFile(this.nombreDeArchivo, "utf-8"))
            ProdFile.forEach((prod) => {
                if (prod.id == id) {
                    element = prod;
                }
            })
            if (element) {
                return element;
            } else { return null; }

        } catch (err) { throw new Error("Error al leer archivo") }
    }
    async getAll() {
        let AllFiles

        try {
            AllFiles = JSON.parse(await fs.promises.readFile(this.nombreDeArchivo, "utf-8"))
            return AllFiles;
        } catch (err) { throw new Error("Error al leer archivo") }


    }
    async deletById(id) {
        let newProdFile = []
        try {
            let ProdFile = JSON.parse(await fs.promises.readFile(this.nombreDeArchivo, "utf-8"))
            ProdFile.forEach((prod) => { if (prod.id != id) { newProdFile.push(prod) } })
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(newProdFile, null, 2))
            return `El producto con id:${id}, fue eliminado con exito`
        } catch (err) { throw new Error("Error al eliminar el producto") }
    }
    async deleteAll() {
        let empty = [];

        try {
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(empty))
            return "Todos los productos fueron eliminados con exito"
        } catch (err) { throw new Error("Error al escribir archivo") }

    }
}
console.log("corriendo...");
module.exports.contenedor = contenedor;
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");  
var Usuario = /** @class */ (function () {
    function Usuario(nombreUsuario, contraseña) {
        this.nombreUsuario = nombreUsuario;
        this.contraseña = contraseña;
    }
    return Usuario;
}());
// Función para realizar el login
function realizarLogin() {
    var usuarioCorrecto = new Usuario('user', '269'); // Cambia esto con tu usuario y contraseña
    console.log('\n--- Inicio de sesion ---');
    var usuarioIngresado = readlineSync.question('Ingrese el nombre de usuario: ');
    var contraseñaIngresada = readlineSync.question('Ingrese la clave: ', { hideEchoBack: true });
    if (usuarioIngresado === usuarioCorrecto.nombreUsuario && contraseñaIngresada === usuarioCorrecto.contraseña) {
        console.log('¡Inicio de sesión exitoso!\n');
        return usuarioCorrecto;
    }
    else {
        console.log('Nombre de usuario o contraseña incorrectos. Saliendo del programa.\n');
        return null;
    }
}
function main() {
    var usuario = realizarLogin();
    if (usuario) {
        menuPrincipal(usuario);
    }
}
var Producto = /** @class */ (function () {
    function Producto(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
    return Producto;
}());
var GestionProductos = /** @class */ (function () {
    function GestionProductos() {
        this.productos = [];
    }
    GestionProductos.prototype.agregarProducto = function (producto) {
        this.productos.push(producto);
        console.log("Producto \"".concat(producto.nombre, "\" a\u00F1adido."));
    };
    GestionProductos.prototype.mostrarProductos = function () {
        console.log('Lista de Productos:');
        this.productos.forEach(function (producto) {
            console.log("ID: ".concat(producto.id, ", Nombre: ").concat(producto.nombre, ", Precio: ").concat(producto.precio));
        });
    };
    GestionProductos.prototype.editarProducto = function (id, nuevoNombre, nuevoPrecio) {
        var producto = this.productos.find(function (p) { return p.id === id; });
        if (producto) {
            producto.nombre = nuevoNombre;
            producto.precio = nuevoPrecio;
            console.log("Producto con ID ".concat(id, " editado."));
        }
        else {
            console.log("Producto con ID ".concat(id, " no encontrado."));
        }
    };
    GestionProductos.prototype.eliminarProducto = function (id) {
        var indice = this.productos.findIndex(function (p) { return p.id === id; });
        if (indice !== -1) {
            var productoEliminado = this.productos.splice(indice, 1)[0];
            console.log("Producto \"".concat(productoEliminado.nombre, "\" eliminado."));
        }
        else {
            console.log("Producto con ID ".concat(id, " no encontrado."));
        }
    };
    GestionProductos.prototype.obtenerProductos = function () {
        // Devuelve una copia de la lista de productos
        return __spreadArray([], this.productos, true);
    };
    return GestionProductos;
}());
// Función principal para el menú interactivo
function menuPrincipal(usuario) {
    var gestionProductos = new GestionProductos();
    while (true) {
        console.log('\n---Menú---');
        console.log('1. Agregar Producto');
        console.log('2. Mostrar Productos');
        console.log('3. Editar Producto');
        console.log('4. Eliminar Producto');
        console.log('5. Salir');
        var opcion = readlineSync.question('Seleccione una opcion:');
        switch (opcion) {
            case '1':
                var nombre = readlineSync.question('Ingrese el nombre del producto: ');
                var precio = parseFloat(readlineSync.question('Ingrese el precio del producto: '));
                var nuevoProducto = new Producto(gestionProductos.obtenerProductos().length + 1, nombre, precio);
                gestionProductos.agregarProducto(nuevoProducto);
                break;
            case '2':
                gestionProductos.mostrarProductos();
                break;
            case '3':
                var idEditar = parseInt(readlineSync.question('Ingrese el ID del producto a editar: '));
                var nuevoNombre = readlineSync.question('Ingrese el nuevo nombre: ');
                var nuevoPrecio = parseFloat(readlineSync.question('Ingrese el nuevo precio: '));
                gestionProductos.editarProducto(idEditar, nuevoNombre, nuevoPrecio);
                break;
            case '4':
                var idEliminar = parseInt(readlineSync.question('Ingrese el ID del producto a eliminar: '));
                gestionProductos.eliminarProducto(idEliminar);
                break;
            case '5':
                console.log('Saliendo del programa. ¡Hasta luego!');
                process.exit(0);
            default:
                console.log('Opción no válida. Por favor, seleccione una opción válida.');
        }
    }
}
// Ejecutar el menú principal
main();

import * as readlineSync from 'readline-sync';

class Usuario {
  constructor(public nombreUsuario: string, public contraseña: string) {}
}
// Función para realizar el login
function realizarLogin(): Usuario | null {
  const usuarioCorrecto = new Usuario('user', '269'); // Cambia esto con tu usuario y contraseña

  console.log('\n--- Inicio de sesion ---');
  const usuarioIngresado = readlineSync.question('Ingrese el nombre de usuario: ');
  const contraseñaIngresada = readlineSync.question('Ingrese la clave: ', { hideEchoBack: true });

  if (usuarioIngresado === usuarioCorrecto.nombreUsuario && contraseñaIngresada === usuarioCorrecto.contraseña) {
    console.log('¡Inicio de sesión exitoso!\n');
    return usuarioCorrecto;
  } else {
    console.log('Nombre de usuario o contraseña incorrectos. Saliendo del programa.\n');
    return null;
  }
}
function main(): void {
  const usuario = realizarLogin();

  if (usuario) {
    menuPrincipal(usuario);
  }
}

class Producto {
  constructor(public id: number, public nombre: string, public precio: number) {}
}

class GestionProductos {
  private productos: Producto[] = [];

  agregarProducto(producto: Producto): void {
    this.productos.push(producto);
    console.log(`Producto "${producto.nombre}" añadido.`);
  }

  mostrarProductos(): void {
    console.log('Lista de Productos:');
    this.productos.forEach((producto) => {
      console.log(`ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}`);
    });
  }

  editarProducto(id: number, nuevoNombre: string, nuevoPrecio: number): void {
    const producto = this.productos.find((p) => p.id === id);
    if (producto) {
      producto.nombre = nuevoNombre;
      producto.precio = nuevoPrecio;
      console.log(`Producto con ID ${id} editado.`);
    } else {
      console.log(`Producto con ID ${id} no encontrado.`);
    }
  }

  eliminarProducto(id: number): void {
    const indice = this.productos.findIndex((p) => p.id === id);
    if (indice !== -1) {
      const productoEliminado = this.productos.splice(indice, 1)[0];
      console.log(`Producto "${productoEliminado.nombre}" eliminado.`);
    } else {
      console.log(`Producto con ID ${id} no encontrado.`);
    }
  }

  obtenerProductos(): Producto[] {
    // Devuelve una copia de la lista de productos
    return [...this.productos];
  }
}

// Función principal para el menú interactivo
function menuPrincipal(usuario: Usuario): void {
const gestionProductos = new GestionProductos();

  while (true) {
    console.log('\n---Menú---');
    console.log('1. Agregar Producto');
    console.log('2. Mostrar Productos');
    console.log('3. Editar Producto');
    console.log('4. Eliminar Producto');
    console.log('5. Salir');

    const opcion = readlineSync.question('Seleccione una opcion:');

    switch (opcion) {
      case '1':
        const nombre = readlineSync.question('Ingrese el nombre del producto: ');
        const precio = parseFloat(readlineSync.question('Ingrese el precio del producto: '));
        const nuevoProducto = new Producto(gestionProductos.obtenerProductos().length + 1, nombre, precio);
        gestionProductos.agregarProducto(nuevoProducto);
        break;
      case '2':
        gestionProductos.mostrarProductos();
        break;
      case '3':
        const idEditar = parseInt(readlineSync.question('Ingrese el ID del producto a editar: '));
        const nuevoNombre = readlineSync.question('Ingrese el nuevo nombre: ');
        const nuevoPrecio = parseFloat(readlineSync.question('Ingrese el nuevo precio: '));
        gestionProductos.editarProducto(idEditar, nuevoNombre, nuevoPrecio);
        break;
      case '4':
        const idEliminar = parseInt(readlineSync.question('Ingrese el ID del producto a eliminar: '));
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

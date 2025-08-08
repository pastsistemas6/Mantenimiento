// src/stores/cart.js
// Importar Pinia
import { defineStore } from 'pinia'

// Definir la variable de estado para mantener información
export const useCart = defineStore('cart', {
  // Declaracion de estados
  state: () => ({
    disable: {},
    name: '',
    rol: '',
    token: false,
    finca: {},
  }),
  // Getters para acceder a los estados
  getters: {
    /*total: (state) => (mesaId, pedidoId) => {
      const mesaProducts = state.products[mesaId]?.[pedidoId]?.productos || [];
      return mesaProducts.reduce(
        (acc, producto) => acc + producto.precio * producto.cantidad,
        0
      );
    },*/
  },
  // Acciones para modificar los estados
  // Aquí puedes definir acciones para modificar el estado, como agregar, actualizar y eliminar
  actions: {
    setRol(rolValue) {
      this.rol = rolValue
    },
    /*addPedido(mesaId, id_pedido) {
      if (!this.products[mesaId]) {
        this.products[mesaId] = {};
      }
      // Aseguramos que el ID de pedido sea único dentro de la mesa
      if (!this.products[mesaId][id_pedido]) {
        this.products[mesaId][id_pedido] = { productos: [] };
      }
    },*/
    // Aquí puedes inicializar el estado de los permisos y token
    inicializar() {
      const diccionario = this.disable
      for (let index = 1; index < 8; index++) {
        diccionario[index] = true
      }
      diccionario[2] = {
        1: true,
        2: true,
      }
      this.token = true
    },
    /*increaseQuantity(mesaId, id_pedido, productId) {
      const pedido = this.products[mesaId]?.[id_pedido];
      if (!pedido) return;

      const product = pedido.productos.find(p => p.id_producto === productId && !p.disabled);
      if (product) {
        product.cantidad += 1;
      }
    },

    decreaseQuantity(mesaId, id_pedido, productId) {
      const pedido = this.products[mesaId]?.[id_pedido];
      if (!pedido) return;

      const product = pedido.productos.find(p => p.id_producto === productId && !p.disabled);
      if (product && product.cantidad > 1) {
        product.cantidad -= 1;
      }
    },*/
    updateCart(id, modulo) {
      if (!this.disable[id]) {
        this.disable[id] = {}
      }
      this.disable[id] = modulo
    },
    updateFinca(nuevaFinca) {
      this.finca = nuevaFinca
    },
    /*removeProduct(mesaId, id_pedido, productId) {
      const pedido = this.products[mesaId]?.[id_pedido];
      if (!pedido) return;

      // Elimina solo el primer producto con el `id_producto` coincidente
      const index = pedido.productos.findIndex(p => p.id_producto === productId && !p.disabled);
      if (index !== -1) {
        pedido.productos.splice(index, 1);
      }
    },*/
    // Reiniciar los estados
    resetCart(id, modulo) {
      if (id && modulo == 'disable') {
        delete this.disable[id]
      } else if (modulo == 'finca') {
        this.finca = {}
      } else {
        this.disable = {}
        this.name = ''
        this.rol = ''
        this.token = false
        this.finca = {}
      }
    },
  },
  // Persistencia del estado en localStorage
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cart', // Clave en localStorage
        storage: localStorage, // Almacenamiento en localStorage
      },
    ],
  },
})

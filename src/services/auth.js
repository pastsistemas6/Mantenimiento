// Datos de fincas
export const fincas = [
  { id: 1, name: "LA NENA", code: "LN" },
  { id: 2, name: "SANTA MARIA", code: "SM" },
  { id: 3, name: "MORADO", code: "MR" },
  { id: 4, name: "FLOREX", code: "FL" }
];

// Datos de usuarios
export const users = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    correo: "carlos.rodriguez@empresa.com",
    rol: "gerente",
    estado: "activo",
    ubicacion: "LA NENA",
    ultimaConexion: "2025-01-15 09:30:00"
  },
  {
    id: 2,
    nombre: "María González",
    correo: "maria.gonzalez@empresa.com",
    rol: "asistente",
    estado: "activo",
    ubicacion: "SANTA MARIA",
    ultimaConexion: "2025-01-14 16:45:00"
  },
  {
    id: 3,
    nombre: "José Martínez",
    correo: "jose.martinez@empresa.com",
    rol: "técnico",
    estado: "inactivo",
    ubicacion: "MORADO",
    ultimaConexion: "2025-01-10 11:20:00"
  },
  {
    id: 4,
    nombre: "Ana López",
    correo: "ana.lopez@empresa.com",
    rol: "pasante",
    estado: "pendiente",
    ubicacion: "FLOREX",
    ultimaConexion: "2025-01-13 14:15:00"
  },
  {
    id: 5,
    nombre: "Pedro Sánchez",
    correo: "pedro.sanchez@empresa.com",
    rol: "operador",
    estado: "activo",
    ubicacion: "LA NENA",
    ultimaConexion: "2025-01-15 08:00:00"
  },
  {
    id: 6,
    nombre: "Laura Jiménez",
    correo: "laura.jimenez@empresa.com",
    rol: "gerente",
    estado: "suspendido",
    ubicacion: "SANTA MARIA",
    ultimaConexion: "2025-01-08 17:30:00"
  },
  {
    id: 7,
    nombre: "Diego Herrera",
    correo: "diego.herrera@empresa.com",
    rol: "técnico",
    estado: "activo",
    ubicacion: "MORADO",
    ultimaConexion: "2025-01-15 10:45:00"
  },
  {
    id: 8,
    nombre: "Carmen Ruiz",
    correo: "carmen.ruiz@empresa.com",
    rol: "asistente",
    estado: "activo",
    ubicacion: "FLOREX",
    ultimaConexion: "2025-01-14 12:30:00"
  },
  {
    id: 9,
    nombre: "Roberto Castro",
    correo: "roberto.castro@empresa.com",
    rol: "operador",
    estado: "inactivo",
    ubicacion: "LA NENA",
    ultimaConexion: "2025-01-12 15:20:00"
  },
  {
    id: 10,
    nombre: "Sofía Morales",
    correo: "sofia.morales@empresa.com",
    rol: "pasante",
    estado: "activo",
    ubicacion: "SANTA MARIA",
    ultimaConexion: "2025-01-15 09:15:00"
  },
  {
    id: 11,
    nombre: "Fernando Vargas",
    correo: "fernando.vargas@empresa.com",
    rol: "gerente",
    estado: "activo",
    ubicacion: "MORADO",
    ultimaConexion: "2025-01-15 07:45:00"
  },
  {
    id: 12,
    nombre: "Isabella Torres",
    correo: "isabella.torres@empresa.com",
    rol: "técnico",
    estado: "pendiente",
    ubicacion: "FLOREX",
    ultimaConexion: "2025-01-11 13:10:00"
  },
  {
    id: 13,
    nombre: "Andrés Delgado",
    correo: "andres.delgado@empresa.com",
    rol: "asistente",
    estado: "activo",
    ubicacion: "LA NENA",
    ultimaConexion: "2025-01-14 18:00:00"
  },
  {
    id: 14,
    nombre: "Valentina Rojas",
    correo: "valentina.rojas@empresa.com",
    rol: "operador",
    estado: "suspendido",
    ubicacion: "SANTA MARIA",
    ultimaConexion: "2025-01-09 16:30:00"
  },
  {
    id: 15,
    nombre: "Camilo Gutiérrez",
    correo: "camilo.gutierrez@empresa.com",
    rol: "pasante",
    estado: "activo",
    ubicacion: "MORADO",
    ultimaConexion: "2025-01-15 11:00:00"
  },
  {
    id: 16,
    nombre: "Natalia Peña",
    correo: "natalia.pena@empresa.com",
    rol: "técnico",
    estado: "activo",
    ubicacion: "FLOREX",
    ultimaConexion: "2025-01-15 08:30:00"
  },
  {
    id: 17,
    nombre: "Julián Ospina",
    correo: "julian.ospina@empresa.com",
    rol: "gerente",
    estado: "inactivo",
    ubicacion: "LA NENA",
    ultimaConexion: "2025-01-07 14:45:00"
  },
  {
    id: 18,
    nombre: "Gabriela Mendoza",
    correo: "gabriela.mendoza@empresa.com",
    rol: "asistente",
    estado: "activo",
    ubicacion: "SANTA MARIA",
    ultimaConexion: "2025-01-15 12:15:00"
  },
  {
    id: 19,
    nombre: "Sebastián Ramírez",
    correo: "sebastian.ramirez@empresa.com",
    rol: "operador",
    estado: "pendiente",
    ubicacion: "MORADO",
    ultimaConexion: "2025-01-13 10:30:00"
  },
  {
    id: 20,
    nombre: "Daniela Flores",
    correo: "daniela.flores@empresa.com",
    rol: "pasante",
    estado: "activo",
    ubicacion: "FLOREX",
    ultimaConexion: "2025-01-14 15:45:00"
  }
];

// Función para autenticar usuario
export const authenticateUser = (email, password) => {
  const user = users.find(u => u.correo === email);
  if (user) {
    // Por ahora solo verificamos que el email exista
    // En un entorno real verificarías también la contraseña
    return {
      success: true,
      user: {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
        ubicacion: user.ubicacion
      }
    };
  }
  return { success: false, message: "Usuario no encontrado" };
};

// Función para obtener todos los usuarios
export const getAllUsers = () => {
  return users;
};

// Función para obtener todas las fincas
export const getAllFincas = () => {
  return fincas;
};

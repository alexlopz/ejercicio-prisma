// pages/api/createUser.js

import { PrismaClient } from "@prisma/client";

// Inicializa PrismaClient
const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Verifica si es una solicitud GET
  if (req.method === "GET") {
    try {
      // Lógica para crear un usuario con un post y un perfil
      const user = await prisma.user.create({
        data: {
          nombre: "Pepito",
          correo: "pepito@corre.com",
          post: {
            create: {
              titutlo: "Pepito salva al mundo",
              contenido: "algo",
            },
          },
          perfil: {
            create: {
              biografia: "Alguna bio",
            },
          },
        },
      });

      // Responde con el usuario creado
      res.status(200).json({ success: true, user });
    } catch (error) {
      // Maneja cualquier error
      console.error("Error creating user: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Si el método no es GET, devuelve un error
    res.status(405).json({ message: "Method not allowed" });
  }
}

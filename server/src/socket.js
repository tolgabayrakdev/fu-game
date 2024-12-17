// socket.js
import { Server } from 'socket.io';

export function createSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Burada ihtiyaca göre korumalı bir origin verebilirsiniz.
      methods: ['GET', 'POST'],
    },
  });

  // Olaylar ve socket bağlantısı
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Mesaj gönderme örneği
    socket.on('message', (data) => {
      console.log('Message from client:', data);
    });

    // Bağlantı sonlandığında
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io; // Socket server'ını geri döndürüyoruz
}

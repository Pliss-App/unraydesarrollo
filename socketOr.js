const { Server } = require('socket.io');
const isController = require('./models/solicitud');

let io;
const connectedDrivers = {};
const connectedUsers = {};
const respuestasSolicitudes = {};
const userStatus = {};
const driverStatus = {};

function initializeSocketOr(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        path: '/api/socket/',
    });

    io.on('connection', async (socket) => {
        console.log(`🔗 Nueva conexión: ${socket.id}`);



        // ✅ Registrar conductor
        socket.on('registrar_conductor', async (driverId) => {
            connectedDrivers[driverId] = socket.id;
            driverStatus[driverId] = 1;  // Marcar como en línea
            console.log(`🚗 Conductor ${driverId} conectado.`);
            // Buscar la solicitud pendiente del conductor
            const solicitudPendiente = await isController.obtenerSolicitudPendiente(driverId);

            if (solicitudPendiente) {
                const tiempoRestante = solicitudPendiente.tiempoExpiracion - Date.now();
                if (tiempoRestante > 0) {
                    //io.to(connectedDrivers[driver.id]).emit('nueva_solicitud', 

                io.to(connectedDrivers[driverId]).emit('nueva_solicitud', {
                    solicitudId:     solicitudPendiente.id,        
                     idUser:          solicitudPendiente.idUser,
                     idService:       solicitudPendiente.idService,
                     start_lat:       solicitudPendiente.start_lat,
                     start_lng:       solicitudPendiente.start_lng,
                     start_direction: solicitudPendiente.start_direction,
                     end_lat:         solicitudPendiente.end_lat,
                     end_lng:         solicitudPendiente.end_lng,
                     end_direction:   solicitudPendiente.end_direction,
                     distance:        solicitudPendiente.distance,
                     distance_unit:   solicitudPendiente.distance_unit,
                     duration_unit:   solicitudPendiente.duration_unit,
                     duration:        solicitudPendiente.duration,
                     costo:           solicitudPendiente.costo,
                     fecha_hora:      solicitudPendiente.fecha_hora,
                     tiempoExpiracion: solicitudPendiente.tiempoExpiracion,
                     foto : {foto : solicitudPendiente.foto }
                    });

                    // Si queda poco tiempo, configurar un timeout
                    setTimeout(async () => {
                        // await isController.updateEstadoSolicitud(solicitudPendiente.id, 'expirada');
                        console.log(`Tiempo agotado para la solicitud ${solicitudPendiente.id}`);
                    }, tiempoRestante);
                } /*else {
            // Si ya pasó el tiempo, cancelar la solicitud
            await isController.updateEstadoSolicitud(solicitudPendiente.id, 'expirada');
            console.log(`Solicitud expirada para el conductor ${conductorId}`);
        }*/
            }
        });

        // ✅ Registrar usuario
        socket.on('registrar_usuario', (userId) => {
            connectedUsers[userId] = socket.id;
            console.log(`👤 Usuario ${userId} conectado.`);
        });

        // ✅ Cambiar estado del conductor (solo conductores pueden hacerlo)
        socket.on('cambiar_estado', (data) => {
            const { driverId, estado } = data;

            // Verifica que sea un conductor
            driverStatus[driverId] = estado; // Guardar estado

            if (estado == 0) {
                // Si pasa a "offline", eliminar de la lista
                delete connectedDrivers[driverId];
                console.log(`❌ Conductor ${driverId} ahora está OFFLINE.`);
            } else {
                // Si vuelve a estar en línea, actualizar socket ID
                connectedDrivers[driverId] = socket.id;
                console.log(`✅ Conductor ${driverId} ahora está ONLINE.`);
            }

        });

        // ✅ Responder solicitud
        socket.on('respuesta_solicitud', (data) => {
            const eventName = `respuesta_solicitud_${data.solicitudId}`;

            // Guardar respuesta
            respuestasSolicitudes[data.solicitudId] = data;

            // Emitir solo al usuario correspondiente
            if (connectedUsers[data.idUser]) {
                io.to(connectedUsers[data.idUser]).emit(eventName, data);
            }
        });

        // ✅ Desconexión
        socket.on('disconnect', () => {
            let userId = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket.id);
            let driverId = Object.keys(connectedDrivers).find(key => connectedDrivers[key] === socket.id);

            if (driverId) {
                if (driverStatus[driverId] !== 0) {
                    // Si el conductor sigue en línea, lo volvemos a registrar
                    console.log(`⚠️ Conductor ${driverId} sigue en línea, re-agregando...`);
                    connectedDrivers[driverId] = socket.id;
                } else {
                    // Si estaba offline, lo eliminamos
                    console.log(`🛑 Conductor ${driverId} se desconectó completamente.`);
                    delete connectedDrivers[driverId];
                }
            }

            if (userId) {
                console.log(`🛑 Usuario ${userId} se desconectó.`);
                delete connectedUsers[userId]; // Eliminar usuario siempre
            }
        });
    });
}

// ✅ Función para obtener `io` cuando se necesite
function getIO() {
    if (!io) {
        throw new Error('Socket.io no ha sido inicializado.');
    }
    return io;
}

module.exports = { initializeSocketOr, getIO, connectedDrivers, connectedUsers, respuestasSolicitudes };

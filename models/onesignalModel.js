const axios = require("axios");
const connection = require('../config/conexion');

const sendNotificationPruebas = async (userId, sonido, title, message, fecha, idUser) => {
    var ONE_id = process.env.ONESIGNAL_ID || "9e1814a7-d611-4c13-b6e4-fa16fafc21e3"
    var ONE_key = process.env.ONESIGNAL_KEY || 'os_v2_app_tymbjj6wcfgbhnxe7ilpv7bb4oojw6p2hb7euxnytkmfdp2cpquannvrcnmz3gwhdweb6mja3z56ujjr6g5pi4iesfx5ahh6opym5di'

    const insertQuery = `INSERT INTO notificaciones 
    (idNoti, 
    idUser, 
    titulo, 
    mensaje, 
    data, 
    estado, 
     fecha_envio,
  fecha_vista,
    plataforma, 
    token_dispositivo) 
VALUES 
(?,?,?,?, ?,?,?,?, ?,?);
`;

    try {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Basic ${ONE_key}`, // Reemplaza con tu clave de API de OneSignal
        };
     console.log("FECHA ", fecha)
        // Ejecutar el INSERT en la base de datos
    const resd =   await connection.query(insertQuery, [userId, idUser, title, message, null, 'enviada', 'null', fecha, 'Android', userId]);
        console.log(resd)
        const body = {
            app_id: ONE_id, // Reemplaza con tu App ID de OneSignal
            include_player_ids: [`${userId}`],
            headings: { en: title }, // Título de la notificación
            contents: { en: message },
            priority: 10,
            small_icon: "ic_stat_onesignal_default", // Ícono pequeño
            large_icon: "ic_large_icon", // Ícono grande
            android_channel_id: "c116f187-f8ea-4dbe-bd8c-6421c29b1e22",
            android_sound: "notificacion_tono", // Nombre del archivo de sonido de la notificación
            force_start: true,
            android_small_icon: "ic_stat_onesignal_default", // Aquí se puede usar un ícono personalizado en tu app
        };

        const response = await axios.post(
            "https://api.onesignal.com/notifications",
            body,
            { headers }
        );
        return response.data;

    } catch (error) {
        throw new Error("Error enviando la notificación: " + error.message);
    }

};

const sendNotification = async (userId, sonido, title, message, fecha, idUser) => {
    var ONE_id = process.env.ONESIGNAL_ID || "9e1814a7-d611-4c13-b6e4-fa16fafc21e3"
    var ONE_key = process.env.ONESIGNAL_KEY || 'os_v2_app_tymbjj6wcfgbhnxe7ilpv7bb4oojw6p2hb7euxnytkmfdp2cpquannvrcnmz3gwhdweb6mja3z56ujjr6g5pi4iesfx5ahh6opym5di'

    const insertQuery = `INSERT INTO notificaciones (idNoti, idUser,  titulo,  mensaje, data, estado, fecha_envio,plataforma, token_dispositivo) 
                    VALUES 
                    (?,?,?,?, ?,?,?,?, ?);`;

    try {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Basic ${ONE_key}`, // Reemplaza con tu clave de API de OneSignal
        };

        // Ejecutar el INSERT en la base de datos
        await connection.query(insertQuery, [userId, idUser, title, message, null, 'enviada', fecha, 'Android', userId]);

        const body = {
            app_id: ONE_id, // Reemplaza con tu App ID de OneSignal
            include_player_ids: [`${userId}`],
            headings: { en: title }, // Título de la notificación
            contents: { en: message },
            priority: 10,
            small_icon: "ic_stat_onesignal_default", // Ícono pequeño
            large_icon: "ic_large_icon", // Ícono grande
            android_channel_id: "c116f187-f8ea-4dbe-bd8c-6421c29b1e22",
            android_sound: "notificacion_tono", // Nombre del archivo de sonido de la notificación
            force_start: true,
            android_small_icon: "ic_stat_onesignal_default", // Aquí se puede usar un ícono personalizado en tu app
        };

        const response = await axios.post(
            "https://api.onesignal.com/notifications",
            body,
            { headers }
        );
        return response.data;

    } catch (error) {
        throw new Error("Error enviando la notificación: " + error.message);
    }

};

const sendNotificationAdmin = async (userId, sonido, title, message, fecha, idUser) => {
    var ONE_id = process.env.ONESIGNAL_ID || "9e1814a7-d611-4c13-b6e4-fa16fafc21e3"
    var ONE_key = process.env.ONESIGNAL_KEY || 'os_v2_app_tymbjj6wcfgbhnxe7ilpv7bb4oojw6p2hb7euxnytkmfdp2cpquannvrcnmz3gwhdweb6mja3z56ujjr6g5pi4iesfx5ahh6opym5di'

    const insertQuery = `INSERT INTO notificaciones (idNoti, idUser,  titulo,  mensaje, data, estado, fecha_envio,plataforma, token_dispositivo) 
                    VALUES 
                    (?,?,?,?, ?,?,?,?, ?);`;

    try {
        const headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Basic ${ONE_key}`, // Reemplaza con tu clave de API de OneSignal
        };

        // Ejecutar el INSERT en la base de datos
        await connection.query(insertQuery, [userId, idUser, title, message, null, 'enviada', fecha, 'Android', userId]);

        const body = {
            app_id: ONE_id, // Reemplaza con tu App ID de OneSignal
            include_player_ids: [`${userId}`],
            headings: { en: title }, // Título de la notificación
            contents: { en: message },
            priority: 10,
            small_icon: "ic_stat_onesignal_default", // Ícono pequeño
            large_icon: "ic_large_icon", // Ícono grande
            android_channel_id: "c116f187-f8ea-4dbe-bd8c-6421c29b1e22",
            android_sound: "notificacion_tono", // Nombre del archivo de sonido de la notificación
            force_start: true,
            android_small_icon: "ic_stat_onesignal_default", // Aquí se puede usar un ícono personalizado en tu app
        };

        const response = await axios.post(
            "https://api.onesignal.com/notifications",
            body,
            { headers }
        );
        return response.data;

    } catch (error) {
        throw new Error("Error enviando la notificación: " + error.message);
    }

};

const updateOnesignalToken = (id, token) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE usuario SET onesignal_token= ? where id= ?`, [token, id], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    });
}

const getTokenId = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT onesignal_token FROM usuario WHERE id= ?`, [id], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    });
}

const getNotificacionesUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM notificaciones WHERE idUser = ? ORDER BY fecha_envio desc`, [id], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    });
}

const updateNotificacionesUser = (id, idVista, fecha) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE notificaciones SET estado = 'vista', fecha_vista= ? WHERE id= ? and idUser = ? `, [fecha, idVista ,  id], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    });
}

module.exports = { sendNotification, sendNotificationAdmin, updateOnesignalToken, getTokenId, sendNotificationPruebas,updateNotificacionesUser , getNotificacionesUser };

const users = [];
// Agrega un usuario a una sala
const addUser = ({ socket_id, name, user_id, room_id }) => {
    const user = { socket_id, name, user_id, room_id };
    users.push(user)
    console.log('users list', users)
    return { user }
}

// Elimina un usuario de una sala.
const removeUser = (socket_id) => {
    const index = users.findIndex(user => user.socket_id === socket_id);
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Busca un usuario dentro de una sala.
const getUser = (socket_id) => users.find(user => user.socket_id === socket_id);

module.exports = { addUser, removeUser, getUser }
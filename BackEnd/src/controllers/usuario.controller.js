import {getConnection} from '../database/database.js'

const getUsuarios = async (req, res) =>{
    try{
        const connection = await getConnection()
        const result = await connection.query('SELECT UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo, Saldo FROM Usuarios')
        res.json(result[0])
    }catch(error){
        console.log(error)
    }
}

const postUsuarios = async (req, res) => {
    try{
        const {UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo,Saldo} = req.body
        const connection = await getConnection()
        const result = await connection.query('INSERT INTO Usuarios (UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo, Saldo) VALUES (?,?,?,?,?,?,?)',
        [UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo,Saldo])
        res.json(result[0])
    }catch(error){
        console.log(error)
    }
}

const deleteUsuarios = async (req, res) =>{
    try {
        const { UsuarioId } = req.params;  
        const connection = await getConnection()
        const result = await connection.query('DELETE FROM Usuarios WHERE UsuarioId = ? ', [UsuarioId])
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.log(error)
    }
}

const updateUsuarios = async (req, res) =>{
    try {
        const {UsuarioId} = req.params;
        const {Nombre, Email, Contraseña} = req.body;
        const connection = await getConnection();
        const result = await connection.query('UPDATE Usuarios SET Nombre = ?, Email = ?, Contraseña = ? WHERE UsuarioId = ?',[Nombre, Email, Contraseña, UsuarioId])
        res.json({ message: 'Usuario actualizado exitosamente' })
    } catch (error) {
        console.log(error)
    }
}

export const methodsUsuario = {
    getUsuarios,
    postUsuarios,
    deleteUsuarios,
    updateUsuarios
}
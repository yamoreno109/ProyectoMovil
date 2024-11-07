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
        const {UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo} = req.body
        const connection = await getConnection()
        const result = await connection.query('INSERT INTO Usuarios (UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo) VALUES (?,?,?,?,?,?)',
        [UsuarioId, Nombre, Email, Contraseña, NumeroCuenta, Tipo])
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
        const {Nombre, Email, Contraseña, Tipo} = req.body;
        const connection = await getConnection();
        const result = await connection.query('UPDATE Usuarios SET Nombre = ?, Email = ?, Contraseña = ?, Tipo = ? WHERE UsuarioId = ?',[Nombre, Email, Contraseña,Tipo, UsuarioId])
        res.json({ message: 'Usuario actualizado exitosamente' })
    } catch (error) {
        console.log(error)
    }
}

const getLogin = async (req, res) => {
    try {
      const { NumeroCuenta, Contraseña } = req.body;
      const connection = await getConnection();
      const result = await connection.query('SELECT * FROM usuarios WHERE NumeroCuenta = ? AND Contraseña = ?', 
      [NumeroCuenta, Contraseña]);
      

      const user = result[0][0];
      
      if (user) { 
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', user }); 
      } else {
        res.status(401).json({ message: 'Credenciales incorrectas' }); 
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error en el servidor' }); 
    }
  };


  const deleteAplicacion = async (req, res) => {
    try {
      const { UsuarioId } = req.params;
      const connection = getConnection();
  
      // Verificar si el usuario existe antes de hacer cualquier eliminación
      const usuarioExistente = await connection.query('SELECT 1 FROM usuarios WHERE UsuarioId = ?', [UsuarioId]);
  
      if (usuarioExistente.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
  
      // 1. Eliminar los reportes asociados al UsuarioId
      const reportes = await connection.query('SELECT IdReporte FROM reportes WHERE UsuarioId = ?', [UsuarioId]);
      const reportesIds = reportes.map(reporte => reporte.IdReporte).filter(id => id != null); 
  
      // Si existen reportes asociados, eliminarlos primero
      if (reportesIds.length > 0) {
        // Eliminar registros en las tablas dependientes de Reportes
        await connection.query('DELETE FROM deudas WHERE IdReporte IN (?)', [reportesIds]);
        await connection.query('DELETE FROM ingresos WHERE IdReporte IN (?)', [reportesIds]);
        await connection.query('DELETE FROM egresos WHERE IdReporte IN (?)', [reportesIds]);
  
        // Eliminar los reportes asociados al usuario
        await connection.query('DELETE FROM reportes WHERE UsuarioId = ?', [UsuarioId]);
      }
  
      // 2. Eliminar las transacciones asociadas al UsuarioId
      const usuario = await connection.query('SELECT NumeroCuenta FROM usuarios WHERE UsuarioId = ?', [UsuarioId]);
      const numeroCuenta = usuario[0]?.NumeroCuenta;
  
      if (numeroCuenta) {
        await connection.query('DELETE FROM transacciones WHERE CuentaId = ?', [numeroCuenta]);
      }
  
      // 3. Eliminar los prestamos asociados al UsuarioId
      await connection.query('DELETE FROM prestamos WHERE UsuarioId = ?', [UsuarioId]);
  
      // 4. Finalmente, eliminar el usuario de la tabla Usuarios
      const resultUsuario = await connection.query('DELETE FROM usuarios WHERE UsuarioId = ?', [UsuarioId]);
  
      if (resultUsuario.affectedRows > 0) {
        res.status(404).json({ message: 'Usuario no encontrado.' });
      } else {
        res.status(200).json({ message: 'Usuario y datos asociados eliminados correctamente.' });
        
      }
    } catch (error) {
      console.error('Error al eliminar el usuario y sus datos asociados:', error);
      res.status(500).json({ message: 'Error en el servidor al intentar eliminar los datos.' });
    }
  };
  
  
  

export const methodsUsuario = {
    getUsuarios,
    deleteAplicacion,
    postUsuarios,
    deleteUsuarios,
    updateUsuarios,
    getLogin
}
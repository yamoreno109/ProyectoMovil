import { getConnection } from "../database/database.js";


const getPrestamos = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT UsuarioId,Monto,Plazo,Estado,FechaSolicitud FROM prestamos')
        res.json(result[0])
    } catch (error) {
        console.log(error)
    }
}

const getPrestamosUno = async (req, res) =>{
    try {
        const { UsuarioId } = req.params;
        console.log('UsuarioId recibido:', UsuarioId);

        const connection = await getConnection();
        const result = await connection.query(
            'SELECT UsuarioId,Monto,Plazo,Estado,FechaSolicitud FROM prestamos WHERE UsuarioId = ?',
            [UsuarioId]
        );

        console.log('Resultado de la consulta:', result);
        const transactions = result[0];

        if (Array.isArray(transactions) && transactions.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Reportes encontrados',
                transactions,
            });
        } else {
            res.status(404).json({ message: 'No se encontraron transacciones' });
        }
    } catch (error) {
        console.log('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

const postPrestamos = async (req,res) =>{
    try {
        const {UsuarioId,Monto,Plazo,Estado,FechaSolicitud} = req.body
        const connection = await getConnection();
        const result = await connection.query('INSERT INTO prestamos (UsuarioId,Monto,Plazo,Estado,FechaSolicitud) VALUES (?,?,?,?,?)',
        [UsuarioId,Monto,Plazo,Estado,FechaSolicitud])
        res.json(result[0])    
    } catch (error) {
        console.log(error)
    }
}

const deletePrestamos = async (req,res) =>{
    try {
        const {UsuarioId} = req.params
        const connection = await getConnection();
        const result = await connection.query('DELETE FROM prestamos WHERE UsuarioId = ?',[UsuarioId])
        if(result.affectedRows>0){
            res.json({message: 'Prestamo Eliminado'})
        }
        else{
            res.status(404).json({message: 'Prestamo no eliminado'})
        }
    } catch (error) {
        console.log(error)
    }
}

const updatePrestamos = async (req,res) =>{
    try {
        const {UsuarioId} = req.params
        const {Monto,Plazo,Estado,FechaSolicitud} = req.body
        const connection = getConnection();
        const result = connection.query('UPDATE prestamos SET Monto = ?, Plazo = ?, Estado = ?, FechaSolicitud = ? WHERE UsuarioId = ?',
        [Monto,Plazo,Estado,FechaSolicitud,UsuarioId])
        if(result.affectedRows > 0){
            res.json({message: 'Prestamo actualizado'})
        }
        else{
            res.status(404).json({message: 'Prestamo no actualizado'})
        }
    } catch (error) {
        
    }
}

export const methodsPrestamos = {
    getPrestamos,
    getPrestamosUno,
    postPrestamos,
    deletePrestamos,
    updatePrestamos
}
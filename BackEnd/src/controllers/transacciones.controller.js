import { getConnection } from "../database/database.js";

const getTransaccion = async (req, res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT CuentaId, TipoTransaccion, Monto, Fecha, Mensaje FROM transacciones');
        res.json(result[0])
    } catch (error) {
        console.log(error)
    }
}

const postTransaccion = async (req, res) =>{
    try{
        const {CuentaId, TipoTransaccion, Monto, Fecha, Mensaje} = req.body
        const connection = await getConnection();
        const result = await connection.query('INSERT INTO transacciones (CuentaId, TipoTransaccion, Monto, Fecha, Mensaje) VALUES (?,?,?,?,?)', 
        [CuentaId, TipoTransaccion, Monto, Fecha, Mensaje]);
        if (result.affectedRows > 0){
            res.json({message: 'Transaccion adiccionada correctamente'})
        }
        else{
            res.status(404).json({message: 'No se pudo completar la transaccion'})
        }
        
    }catch(error){
        console.log(error)
    }
}

const deleteTransaccion = async (req, res) => {
    try {
        const {CuentaId} = req.params
        const connection = await getConnection();
        const result = await connection.query('DELETE FROM transacciones WHERE CuentaId = ?',[CuentaId])
        if(result.affectedRows > 0){
            res.json({message : 'Transsacion eliminada exitosamente'})
        }
        else{
            res.status(404).json({message: 'Transaccion no encontrada'})
        }
    } catch (error) {
        console.log(error)
    }
}

const updateTransaccion = async (req, res) => {
    try {
        const {CuentaId} = req.params
        const {TipoTransaccion,Monto,Fecha,Mensaje} = req.body
        const connection = await getConnection();
        const result = await connection.query('UPDATE transacciones SET TipoTransaccion = ?, Monto = ?, Fecha = ?, Mensaje = ? WHERE CuentaId = ?',
        [TipoTransaccion,Monto,Fecha,Mensaje,CuentaId]);
        if(result.affectedRows>0){
            res.json({message: 'Transaccion actualizada'})
        }
        else{
            res.status(404).json({message: 'No se pudo realizar la transaccion'})
        }
    } catch (error) {
        console.log(error)
    }
}

export const methodsTransaccion = {
    getTransaccion,
    postTransaccion,
    deleteTransaccion,
    updateTransaccion
}
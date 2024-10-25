import { getConnection } from "../database/database.js";

const getReportes = async (req,res) =>{
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT UsuarioId,HistoricoIngresos,HistoricoEgresos,Deudas FROM reportes');
        res.json(result[0])
    } catch (error) {
        console.log(error)
    }
}

const postReportes = async (req, res) =>{
    try {
        const {UsuarioId,HistoricoIngresos,HistoricoEgresos,Deudas} = req.body
        const connection = await getConnection();
        const result = connection.query('INSERT INTO reportes (UsuarioId,HistoricoIngresos,HistoricoEgresos,Deudas) VALUES (?,?,?,?)',
        [UsuarioId,HistoricoIngresos,HistoricoEgresos,Deudas])
        if(result.affectedRows > 0){
            res.json({message: 'Reporte agregado'})
        }
        else{
            res.status(404).json('Reporte no agregado')
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteReportes = async (req, res) =>{
    try {
        const {UsuarioId} = req.params
        const connection = getConnection();
        const result = connection.query('DELETE FROM reportes WHERE UsuarioId = ?', [UsuarioId])
        if(result.affectedRows>0){
            res.json({message: 'Reporte Eliminado'})
        }
        else{
            res.status(404).json({message: 'Reporte no eliminado'})
        }
    } catch (error) {
        console.log(error)
    }
}

const updateReportes = async (req,res) =>{
    try {
        const {UsuarioId} = req.params
        const {HistoricoIngresos,HistoricoEgresos,Deudas} = req.body
        const connection = await getConnection();
        const result = await connection.query('UPDATE reportes SET HistoricoIngresos = ?, HistoricoEgresos = ?, Deudas = ? WHERE UsuarioId = ?',
        [HistoricoIngresos,HistoricoEgresos,Deudas, UsuarioId]);
        if(result.affectedRows>0){
            res.json({message: 'Reporte Actualizado'})
        }
        else{
            res.status(404).json({message: 'Reporte no actualizado'});
        }
    } catch (error) {
        console.log(error);
    }
}

export const methodsReportes = {
    getReportes,
    postReportes,
    deleteReportes,
    updateReportes
}
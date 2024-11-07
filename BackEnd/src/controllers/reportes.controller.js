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

const getReporteUno = async (req,res) =>{
    try {
        const {UsuarioId} = req.params
        const connection = await getConnection();
        const result = await connection.query('SELECT HistoricoIngresos,HistoricoEgresos,Deudas FROM reportes WHERE UsuarioId = ?',[UsuarioId])
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

const Reportes = async (req, res) => {
    const { UsuarioId } = req.params;
  
    const ingresosQuery = `
      SELECT I.Monto, I.Fecha, I.Descripcion
      FROM ingresos AS I
      INNER JOIN reportes AS R ON I.IdReporte = R.IdReporte
      WHERE R.UsuarioId = ?
    `;
  
    const egresosQuery = `
      SELECT E.Monto, E.Fecha, E.Descripcion
      FROM egresos AS E
      INNER JOIN reportes AS R ON E.IdReporte = R.IdReporte
      WHERE R.UsuarioId = ?
    `;
  
    const deudasQuery = `
      SELECT D.Monto, D.Fecha, D.Descripcion
      FROM deudas AS D
      INNER JOIN reportes AS R ON D.IdReporte = R.IdReporte
      WHERE R.UsuarioId = ?
    `;
  
    try {
      const connection = getConnection()
      const [ingresos] = await connection.query(ingresosQuery, [UsuarioId]);
      const [egresos] = await connection.query(egresosQuery, [UsuarioId]);
      const [deudas] = await connection.query(deudasQuery, [UsuarioId]);
  
     
      res.json({
        success: true,
        reportes: {
          Ingresos: ingresos,
          Egresos: egresos,
          Deudas: deudas
        }
      });
  
    } catch (err) {
      console.error('Error al obtener los reportes:', err);
      res.status(500).json({
        success: false,
        message: 'Error al obtener los reportes'
      });
    }
  };

export const methodsReportes = {
    getReportes,
    Reportes,
    getReporteUno,
    postReportes,
    deleteReportes,
    updateReportes
}
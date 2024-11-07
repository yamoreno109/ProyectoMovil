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

const getTransaccionUno = async (req, res) => {
    try {
        const { CuentaId } = req.params;
        console.log('CuentaId recibido:', CuentaId);

        const connection = await getConnection();
        const result = await connection.query(
            'SELECT TipoTransaccion, Monto, Fecha, Mensaje FROM transacciones WHERE CuentaId = ?',
            [CuentaId]
        );

        console.log('Resultado de la consulta:', result);
        const transactions = result[0];

        if (Array.isArray(transactions) && transactions.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Transacciones encontradas',
                transactions,
            });
        } else {
            res.status(404).json({ message: 'No se encontraron transacciones' });
        }
    } catch (error) {
        console.log('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


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

const updateTransferencia = async (req, res) => {
    let connection;
    try {
        const { cuentaRemitente, cuentaDestinatario, monto } = req.body;
        connection = await getConnection(); 

        const [remitente] = await connection.query('SELECT * FROM Usuarios WHERE NumeroCuenta = ?', [cuentaRemitente]);
        if (remitente.length === 0) {
            return res.status(404).json({ message: 'Cuenta remitente no encontrada' });
        }

        const [destinatario] = await connection.query('SELECT * FROM Usuarios WHERE NumeroCuenta = ?', [cuentaDestinatario]);
        if (destinatario.length === 0) {
            return res.status(404).json({ message: 'Cuenta destinatario no encontrada' });
        }

        const saldoRemitente = remitente[0].Saldo;
        if (saldoRemitente < monto) {
            return res.status(400).json({ message: 'Saldo insuficiente' });
        }

        
        await connection.query('UPDATE Usuarios SET Saldo = Saldo - ? WHERE NumeroCuenta = ?', [monto, cuentaRemitente]);
        await connection.query('UPDATE Usuarios SET Saldo = Saldo + ? WHERE NumeroCuenta = ?', [monto, cuentaDestinatario]);

       
        const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const mensaje = `Transferencia de ${monto} de ${cuentaRemitente} a ${cuentaDestinatario}`;

        await connection.query('INSERT INTO Transacciones (CuentaId, TipoTransaccion, Monto, Fecha, Mensaje) VALUES (?, ?, ?, ?, ?)', [
            cuentaRemitente,
            'Transferencia',
            monto,
            fecha,
            mensaje
        ]);


        res.status(200).json({ message: 'Transferencia realizada con éxito' });

    } catch (error) {
        console.error('Error al realizar la transferencia:', error);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const updateDeposito = async (req, res) => {
    let connection;
    try {
        const { cuentaDestinatario, monto } = req.body; 
        connection = await getConnection();

        const [cuenta] = await connection.query('SELECT * FROM Usuarios WHERE NumeroCuenta = ?', [cuentaDestinatario]);
        if (cuenta.length === 0) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }


        await connection.query('UPDATE Usuarios SET Saldo = Saldo + ? WHERE NumeroCuenta = ?', [monto, cuentaDestinatario]);

  
        const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const mensaje = `Depósito de ${monto} a la cuenta ${cuentaDestinatario}`;

        await connection.query('INSERT INTO Transacciones (CuentaId, TipoTransaccion, Monto, Fecha, Mensaje) VALUES (?, ?, ?, ?, ?)', [
            cuentaDestinatario,
            'Depósito',
            monto,
            fecha,
            mensaje
        ]);

        res.status(200).json({ message: 'Depósito realizado con éxito' });

    } catch (error) {
        console.error('Error al realizar el depósito:', error);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    } 
};

const updateRetiro = async (req, res) => {
    let connection;
    try {
        const { cuentaDestinatario, monto } = req.body; 
        connection = await getConnection();

        const [cuenta] = await connection.query('SELECT * FROM Usuarios WHERE NumeroCuenta = ?', [cuentaDestinatario]);
        if (cuenta.length === 0) {
            return res.status(404).json({ message: 'Cuenta no encontrada' });
        }

      
        const saldoActual = cuenta[0].Saldo; 
        if (saldoActual < monto) {
            return res.status(400).json({ message: 'Saldo insuficiente para realizar el retiro' });
        }

       
        await connection.query('UPDATE Usuarios SET Saldo = Saldo - ? WHERE NumeroCuenta = ?', [monto, cuentaDestinatario]);

        
        const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const mensaje = `Retiro de ${monto} de la cuenta ${cuentaDestinatario}`;

        await connection.query('INSERT INTO Transacciones (CuentaId, TipoTransaccion, Monto, Fecha, Mensaje) VALUES (?, ?, ?, ?, ?)', [
            cuentaDestinatario,
            'Retiro',
            monto,
            fecha,
            mensaje
        ]);

        res.status(200).json({ message: 'Retiro realizado con éxito' });

    } catch (error) {
        console.error('Error al realizar el retiro:', error);
        res.status(500).json({ message: 'Error del servidor', error: error.message });
    } 
};


export const methodsTransaccion = {
    getTransaccion,
    getTransaccionUno,
    postTransaccion,
    deleteTransaccion,
    updateTransaccion,
    updateTransferencia,
    updateDeposito,
    updateRetiro
}
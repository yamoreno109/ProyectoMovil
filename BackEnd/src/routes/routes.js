import { Router } from "express";
import { methodsUsuario } from "../controllers/usuario.controller.js";
import { methodsTransaccion } from "../controllers/transacciones.controller.js";
import { methodsPrestamos } from "../controllers/prestamos.controller.js";
import { methodsReportes } from "../controllers/reportes.controller.js";

const router = Router();

router.get('/getusuario', methodsUsuario.getUsuarios);
router.post('/postusuario',methodsUsuario.postUsuarios);
router.delete('/deleteusuario/:UsuarioId', methodsUsuario.deleteUsuarios);
router.put('/updateusuarios/:UsuarioId', methodsUsuario.updateUsuarios);
router.post('/login',methodsUsuario.getLogin);
router.delete('/borrar/:UsuarioId',methodsUsuario.deleteAplicacion);

router.get('/gettransaccion', methodsTransaccion.getTransaccion);
router.get('/transaccion_reporte/:CuentaId',methodsTransaccion.getTransaccionUno)
router.post('/posttransaccion', methodsTransaccion.postTransaccion);
router.delete('/deletetransaccion/:CuentaId', methodsTransaccion.deleteTransaccion);
router.put('/updatetransaccion/:CuentaId',methodsTransaccion.updateTransaccion);
router.put('/transferencias',methodsTransaccion.updateTransferencia)
router.put('/depositos',methodsTransaccion.updateDeposito);
router.put('/retiro',methodsTransaccion.updateRetiro);

router.get('/getprestamo',methodsPrestamos.getPrestamos);
router.get('/getprestamouno/:UsuarioId',methodsPrestamos.getPrestamosUno);
router.post('/postprestamo',methodsPrestamos.postPrestamos);
router.delete('/deleteprestamo/:UsuarioId',methodsPrestamos.deletePrestamos);
router.put('/updateprestamo/:UsuarioId',methodsPrestamos.updatePrestamos);

router.get('/getreportes',methodsReportes.getReportes);
router.get('/reporteuno/:UsuarioId',methodsReportes.getReporteUno)
router.get('/reporte/:UsuarioId',methodsReportes.Reportes)
router.post('/postreportes',methodsReportes.postReportes);
router.delete('/deletereportes/:UsuarioId',methodsReportes.deleteReportes);
router.put('/updatereportes/:UsuarioId', methodsReportes.updateReportes);


export default router
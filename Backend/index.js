import express, { response } from "express"
import cors from 'cors'
import db from './database/db.js'
import router from "./routers/routes.js"
import RoutesUsers from "./routers/RoutesUsers.js"
import RoutesLogin from "./routers/auth.js"
import RouteSedes from "./routers/sedes.js"
import RouteBienes from "./routers/bienes.js"
import RouteNeabienes from "./routers/neabienes.js"
import RouteNeaEntradas from "./routers/neaentradas.js"
import RouteBienesNeasEntradas from "./routers/neabienesentradas.js"
import RoutePecosaBienes from "./routers/pecosabienes.js"
import RoutePecosaPedidos from "./routers/pecosapedidos.js"
import RouteBienesPedidos from "./routers/pecosabienespedidos.js"
import RouteMetas from "./routers/metas.js"
import RouteIventarioInicial from "./routers/invetinicial.js"
import RouteInvenrarioInicialFilterDate from "./routers/invetariadoInicialFilterdate.js"

import RouteObras from "./routers/obras.js"
import RouteAlmacen from "./routers/almacen.js"

import RouteImportExel from "./routers/ExelInventariado.js"
import RouteNeasImportExel from "./routers/ExelNeas.js"
import RouteBienesImportExel from "./routers/Excelbienes.js"
import RouteAdministrativosExel from "./routers/ExcelAdministrativos.js"

import CantTotal from "./routers/CantTotal.js"
import Stock from "./routers/stoks.js"
import StockNea from "./routers/stocksneas.js"

import RouterExcelTotal from "./routers/ExcelTotal.js"
import RouterExcelSalida from "./routers/ExcelTotalStock.js"

import RouterExcelMetas from "./routers/ExelMetas.js"

import session from "express-session"
import dotenv from "dotenv"
import SequelizeS from "connect-session-sequelize"

import { PORT, SECRET_KEY } from './config/config.js'

import { adminOnly, verifyUser } from "./middleware/VerifyAuth.js"
dotenv.config()



const sessionS = SequelizeS(session.Store)
const store = new sessionS({
    db: db,
    // expiration: 10 * 30 * 1000

})


const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://192.168.0.6:3000'
}))
app.use(session({
    secret: process.env.SECRET_KEY || '28392mcdslskkkks',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        httpOnly: false,
        secure: 'auto',
        //maxAge: 60000,
        //expires: 8.64e+7 

    }
})
)

//app.use(cors)
app.use('/login', RoutesLogin)
app.use('/user', verifyUser, router)
app.use('/createuseradmin', RoutesUsers)
app.use('/sedes', verifyUser, RouteSedes)
app.use('/bienes', verifyUser, RouteBienes)
app.use('/neasbienes', verifyUser, RouteNeabienes)
app.use('/neasentradas', verifyUser, RouteNeaEntradas)
app.use('/neasbienesentradas', verifyUser, RouteBienesNeasEntradas)
app.use('/pecosabienes', verifyUser, RoutePecosaBienes)
app.use('/pecosapedidos', verifyUser, RoutePecosaPedidos)
app.use('/pecosabienespedidos', RouteBienesPedidos)
app.use('/metas', verifyUser, RouteMetas)
app.use('/invetinicial', verifyUser, RouteIventarioInicial)
app.use('/invetinicialfilterdate', verifyUser, RouteInvenrarioInicialFilterDate)

app.use('/obras', verifyUser, RouteObras)
app.use('/almacen', verifyUser, RouteAlmacen)


app.use('/excelimport', verifyUser, RouteImportExel)
app.use('/excelneasimport', verifyUser, RouteNeasImportExel)
app.use('/excelimportbienes', verifyUser, RouteBienesImportExel)
app.use('/excelimportadministrativos', verifyUser, RouteAdministrativosExel)


app.use('/Total', verifyUser, RouterExcelTotal)
app.use('/SalidaTotal', verifyUser, RouterExcelSalida)

app.use('/excelmetas',verifyUser, RouterExcelMetas)


app.use('/cantidadtotal', verifyUser, CantTotal)
app.use('/stock', verifyUser, Stock)
app.use('/stocknea', verifyUser, StockNea)


try {
    await db.authenticate()
    console.log('Authenticated successfully DB')
} catch (error) {
    console.log(`Error conextion DB : ${error}`)
}

//store.sync()

/*app.get('/',(req,res)=>{
    res.send('Hola mundo')
})
*/
app.listen(process.env.PORT, () => {
    console.log('Server Up running in', process.env.PORT)
})



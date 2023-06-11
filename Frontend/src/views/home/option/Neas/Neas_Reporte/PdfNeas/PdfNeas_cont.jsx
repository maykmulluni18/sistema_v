import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Page, Text, View,
    Document, StyleSheet,
    PDFDownloadLink, PDFViewer, Image
} from '@react-pdf/renderer';
import Layout from '../../../../Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UNAP_LOGO from "../.././../image/UNAP.png"
import "./pdfneas.scss"
import { authSlice } from '../../../../auth/Authen';
import { DB_URL } from '../../../../../../config/config';

const URI = DB_URL + 'neasentradas/'
const URI1 = DB_URL + 'neasbienesentradas/'

// Create styles
const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth - 280,
        height: window.innerHeight - 130,
    },
    body: {
        fontStyle: 'italic',
        paddingTop: 5,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontStyle: 'oblique',


    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    image: {
        width: 50,
        height: 50,
        top: 30,
        left: 40,
        position: "absolute"

    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
    },
    header_subtitle: {
        color: "grey",
        fontSize: 8,
        left: 50,
        top: 5,
        paddingHorizontal: 35,
       //fontFamily: "OpenSans sans-serif",        

    },
    header_subtitle_oficina: {
        color: "grey",
        fontSize: 7,
        left: 80,
        top: 10,
        paddingHorizontal: 35,
    },
    header_subtitle_almacen: {
        color: "grey",
        fontSize: 7,
        left: 100,
        paddingHorizontal: 35,
        top: 16,
    },
    header_title_principal: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
        textAlign: "center",
        color: "#212121",

    },
    header_title_principal_2: {
        fontSize: 12,
        color: "grey",
        textAlign: "center",
        top: 6
    },
    text_vacio: {
        color: "white",
        fontSize: 4,
    },
    // Contenido general 
    gen_depen: {
        width: "94%",
        left: "3.5%",
        borderRadius: "5px",
        height: "12%",
        top: "2%",
        border: "1px solid gray",

    },
    dependencias: {
        fontSize: 8,
        color: "#212121",
        right: "1.5%",
        paddingHorizontal: 16,
        top: "6%",

    },
    usuario: {
        fontSize: 8,
        color: "#212121",
        right: "1.5%",
        paddingHorizontal: 16,
        top: "14%",

    },
    destino_a: {
        fontSize: 8,
        color: "#212121",
        right: "1.5%",
        paddingHorizontal: 16,
        top: "23%",


    },
    entregar_a: {
        fontSize: 8,
        color: "#212121",
        right: "1.5%",
        paddingHorizontal: 16,
        top: "32%",

    },
    tipo_obra: {
        fontSize: 8,
        color: "#212121",
        right: "1.5%",
        paddingHorizontal: 16,
        top: "41%",
    },
    tipo_moneda: {
        fontSize: 8,
        color: "#212121",
        left: "45%",
        paddingHorizontal: 16,
        top: "-41%",
    },
    fecha_nea: {
        fontSize: 8,
        color: "#212121",
        left: "45%",
        paddingHorizontal: 16,
        top: "-32%",
    },
    tipo_almacen: {
        fontSize: 8,
        color: "#212121",
        left: "45%",
        paddingHorizontal: 16,
        top: "-23%",
    },
    tipo_documento: {
        fontSize: 8,
        color: "#212121",
        left: "45%",
        paddingHorizontal: 16,
        top: "-14%",
    },
    tipo_cambio: {
        fontSize: 8,
        color: "#212121",
        left: "73%",
        paddingHorizontal: 16,
        top: "-78%",
    },
    tipo_uso: {
        fontSize: 8,
        color: "#212121",
        left: "73%",
        paddingHorizontal: 16,
        top: "-69%",
    },
    fecha_contend: {
        border: "1px solid gray",
        borderRadius: "5px",
        width: "8%",
        left: "80.5%",
        borderRadius: "5px",
        height: "5%",
        top: "-18%",

        //border: "1px solid gray",

    },
    fecha_title: {
        fontSize: 8,
        color: "#212121",
        textAlign: "center",

    },
    fecha: {
        borderTop: "1px solid gray",
        fontSize: 8.5,
        color: "#212121",
        top: "1px",
        textAlign: "center",


    },

    spacio: {
        color: "white",
        textAlign: 1,

    },
    pageNumber: {
        position: "absolute",
        fontSize: 10,
        bottom: 30,
        left: 720,
        right: 0,
        top: 45,
        textAlign: "center",
        color: "grey",
    },
    table: {
        display: "table",
        width: "auto",
        left: "0.5%",
        borderStyle: "solid",
        top: "-6",

    },


    tableRow: {
        margin: "auto",
        flexDirection: "row",


    },
    tableCol_id_V: {
        width: "2%",
        //borderStyle: "solid",
        color: "white",
        border: "1px solid gray",

    },


    tableCol_numero: {
        width: "2%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_unidad: {
        width: "8%",
        
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_descripcion: {
        width: "44%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_codigo: {
        width: "9%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_cantidad: {
        width: "7%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_fte: {
        width: "7%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_unitario: {
        width: "8%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_total: {
        width: "9%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCol_observacion: {
        width: "12%",
        borderStyle: "solid",
        border: "1px solid gray",

    },
    tableCell: {

        marginTop: 4,
        fontSize: 8,
        height: 18.7,
        textAlign: "center",

    },
    tableCell_cantidad: {
        fontSize: 8,
        textAlign: "center",

    },

    tableCell_des: {
        //color: "red",
        marginTop: 4,
        fontSize: 8,
        left: 2,   
        height: 18.7,
        fontSize: 8,
        //margin: "auto",
    },
    tableCol_subtotal: {
        width: "85%",
        borderStyle: "solid",
        border: "1px solid gray",
        textAlign: "left",

    },
    tableCol_subtotal_1: {
        width: "9%",
        borderStyle: "solid",
        border: "1px solid gray",
    },
    Oficio: {
        fontSize: 8,
        color: "#212121",
        left: 10,
        top: 15,
        paddingHorizontal: 18,
        fontWeight: "bold"
    },
    solicitante: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: "3.5%",
        top: 46,
        fontWeight: "bold"

    },
    solicitante_1: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 57,
        top: 48,
        fontWeight: "bold"
    },
    jefe_abast: {
        fontSize: 8,
        color: "#212121",
        left: 230,
        top: 40,
        fontWeight: "bold"
    },
    jefe_abast_1: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 220,
        top: 22,
        fontWeight: "bold"
    },
    jefe_alm: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 436,
        top: 24,
        fontWeight: "bold"
    },
    jefe_alm_1: {
        fontSize: 8,
        color: "#212121",
        left: 410,
        top: 7,
        fontWeight: "bold"
    },
    recibi_con: {
        fontSize: 8,
        color: "#212121",
        left: 626,
        top:  10,
        fontWeight: "bold"
    },
    recibi_con_1: {
        fontSize: 8,
        color: "#212121",
        left: 600,
        top: -8,
        fontWeight: "bold"
    }

});


const PdfNeas_cont = () => {
    //const [contend,getContent] = useState([])
    var today = new Date();
    var now = today.toLocaleTimeString('en-US');
    console.log(now);

    var date = today.toLocaleDateString()
    console.log(date);

    useEffect(() => {
        getNeasEntradas()
        getNeasBienesEntradas()
    }, [])

    const [id_administradores, setIdAdministradores] = useState('')
    const [tipo_de_sede, setTipoDeSede] = useState('')
    const [tipo_de_ingreso, setTipoDeIngreso] = useState('')
    const [recibido_por, setRecibidoPor] = useState('')
    const [id_obras, setIdObras] = useState('')
    const [tipo_de_moneda, setTipoDeMoneda] = useState('')
    const [tipo_de_almacen, setTipoDeAlmacen] = useState('')
    const [documento, setDocumento] = useState('')
    const [tipo_de_cambio, setTipoDeCambio] = useState('')
    const [tipo_de_uso, setTipoDeUso] = useState('')
    const [fecha_de_nea, setFechaDeNea] = useState('')
    const [fecha_de_registro, setFechaDeRegristro] = useState('')
    const { id } = useParams()

    const getNeasEntradas = async () => {
        const res = await axios.get(URI + id,)
        setIdAdministradores(res.data.usuario.nombres + ' ' +
            res.data.usuario.apellido_paterno + ' ' +
            res.data.usuario.apellido_materno)
        setTipoDeSede(res.data.tipo_de_sede)
        setTipoDeIngreso(res.data.tipo_de_ingreso)
        setRecibidoPor(res.data.recibido_por)
        setIdObras(res.data.Meta.obra)
        setTipoDeMoneda(res.data.tipo_de_moneda)
        setTipoDeAlmacen(res.data.tipo_de_almacen)
        setDocumento(res.data.documento)
        setTipoDeCambio(res.data.tipo_de_cambio)
        setTipoDeUso(res.data.tipo_de_uso)
        setFechaDeNea(res.data.fecha_de_nea)
        setFechaDeRegristro(res.data.fecha_de_registro)

    }
    const [neasbienesentradas, setNeasBienesEntradas] = useState([])
    const getNeasBienesEntradas = async () => {
        const res = await axios.get(URI1 + id,)
        setNeasBienesEntradas(res.data)
    }
    const [sumatotal, setSumatTotal] = useState(0)


    useEffect(() => {
        const getsumarTotal = () => {
            const total = neasbienesentradas.map((item) => parseFloat(item.cantidad * item.p_unitario))
                .reduce((previus, current) => {
                    return previus + current;
                }, 0)
            setSumatTotal(total)
        };
        getsumarTotal()
    });
    /*
    const [pedidospecosap, setPecosaPedidosP] = useState([])
    const getPedidosPecosa_p = async () => {
        const res = await axios.get(URI + id,)
        console.log({...res.data})
        setPecosaPedidosP(res.data)  
    }*/

    return (
        <>
            <div>
                <div className='top'>
                    <div className='BotonesOp'>
                        <Link to="../">
                            <button className='regresar'>Regresar</button >
                        </Link>
                        {/*<bottom className='imprimir'></bottom>*/}

                    </div>
                </div>
            </div>
            <div>
                <PDFViewer style={styles.viewer} >

                    <Document>
                        <Page size="A4" orientation="landscape" style={styles.body}>

                            <Image
                                style={styles.image}
                                src={UNAP_LOGO}
                                fixed
                            />
                            <Text style={styles.header} fixed></Text>
                            <Text style={styles.header_subtitle} fixed>
                                UNIVERSIDAD NACIONAL DEL ALTIPLANO
                            </Text>
                            <Text style={styles.header_subtitle_oficina} fixed>
                                OFICINA DE ABASTECIMIENTO
                            </Text>
                            <Text style={styles.header_subtitle_almacen} fixed>
                                ALMACEN CENTRAL
                            </Text>
                            <Text style={styles.header_title_principal} fixed>
                                NEA - TRANSFERENCIA
                            </Text>
                            <Text style={styles.header_title_principal_2} fixed>
                                Nro : {id.padStart(4,0)}
                            </Text>

                            {/* <Image style={styles.image} src={LebronStretch} />*/}
                            <Text style={styles.text_vacio} fixed>
                                vacio
                            </Text>
                            <View style={styles.gen_depen} fixed>
                                <Text style={styles.dependencias} fixed>
                                    <Text fixed>NOTA DE ENTRADA   :</Text>   00{id}
                                </Text>
                                <Text style={styles.usuario} fixed>
                                    <Text fixed>ENTREGADO POR     :</Text>   {id_administradores}
                                </Text>
                                <Text style={styles.destino_a} fixed>
                                    <Text>TIPO DE INGRESO     :</Text>   {tipo_de_ingreso}
                                </Text>
                                <Text style={styles.entregar_a} fixed>
                                    <Text fixed>RECIBIDOR POR </Text>       :<Text>   {recibido_por} </Text>
                                </Text>

                                <Text style={styles.tipo_obra} fixed>
                                    <Text fixed>OBRA </Text>                          :<Text>   {id_obras} </Text>
                                </Text>
                                <Text style={styles.tipo_moneda} fixed>
                                    <Text fixed>MONEDA </Text>             :<Text>   {tipo_de_moneda} </Text>
                                </Text>
                                <Text style={styles.fecha_nea} fixed>
                                    <Text fixed>FECHA </Text>                 :<Text>   {fecha_de_nea} </Text>
                                </Text>
                                <Text style={styles.tipo_almacen} fixed>
                                    <Text>ALMACEN </Text>            :<Text>   {tipo_de_almacen} </Text>
                                </Text>
                                <Text style={styles.tipo_documento} fixed>
                                    <Text fixed>DOCUMENTO </Text>      :<Text>   {documento} </Text>
                                </Text>
                                <Text style={styles.tipo_cambio} fixed>
                                    <Text fixed>TIPO DE CAMBIO </Text>     :<Text>   {tipo_de_cambio} </Text>
                                </Text>
                                <Text style={styles.tipo_uso} fixed>
                                    <Text fixed>TIPO DE USO </Text>           :<Text>   {tipo_de_uso} </Text>
                                </Text> 
                            </View>
                            <Text style={styles.Oficio} fixed>
                                REFERENCIA: OFICIO N° 037-2022-SUMAP/USG-UNA-P
                            </Text>


                            <View style={styles.fecha_contend} fixed>
                                <Text style={styles.fecha_title} fixed>
                                    Dia Mes Año
                                </Text>
                                <Text style={styles.fecha} fixed>
                                    {date}  {now}
                                </Text>
                            </View>

                            {/* Tabla  _______________________*/}
                            <View style={styles.table} >

                                <View style={styles.tableRow} fixed>
                                    <View style={styles.tableCol_numero} >
                                        <Text style={styles.tableCell} >N°</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad} >
                                        <Text style={styles.tableCell} >CANTIDAD</Text>
                                    </View>
                                    <View style={styles.tableCol_descripcion}>
                                        <Text style={styles.tableCell} >DESCRIPCIÓN</Text>
                                    </View>
                                    <View style={styles.tableCol_unidad} >
                                        <Text style={styles.tableCell} >U. MEDIDA</Text>
                                    </View>
                                    <View style={styles.tableCol_fte} >
                                        <Text style={styles.tableCell} >FTE/FTO</Text>
                                    </View>
                                    <View style={styles.tableCol_codigo} >
                                        <Text style={styles.tableCell} >C. CONTABLE</Text>
                                    </View>

                                    <View style={styles.tableCol_unitario} >
                                        <Text style={styles.tableCell} >P. UNITARIO</Text>
                                    </View>
                                    <View style={styles.tableCol_total} >
                                        <Text style={styles.tableCell} >VALOR TOTAL</Text>
                                    </View>
                                </View>

                                {neasbienesentradas.map((x, i) =>

                                    <View style={styles.tableRow} key={`BR${i}`}>
                                        <View style={styles.tableCol_numero}>
                                            <Text style={styles.tableCell}>{i + 1}</Text>
                                        </View>
                                        <View style={styles.tableCol_cantidad}>
                                            <Text style={styles.tableCell}>{x.cantidad}</Text>
                                        </View>
                                        <View style={styles.tableCol_descripcion}>
                                            <Text style={styles.tableCell_des}>{x.biene.description.toUpperCase()}</Text>
                                        </View>
                                        <View style={styles.tableCol_unidad}>
                                            <Text style={styles.tableCell}>{x.biene.unidad_de_medida.toLowerCase()}</Text>
                                        </View>
                                        <View style={styles.tableCol_fte}>
                                            <Text style={styles.tableCell}>0{x.fte_fto}</Text>
                                        </View>
                                        <View style={styles.tableCol_codigo}>
                                            <Text style={styles.tableCell}>{x.cuenta_contable}</Text>
                                        </View>
                                        <View style={styles.tableCol_unitario}>
                                            <Text style={styles.tableCell}>{x.p_unitario}</Text>
                                        </View>
                                        <View style={styles.tableCol_total}>
                                            <Text style={styles.tableCell}>{Number.parseFloat(x.cantidad * x.p_unitario).toFixed(3)}</Text>
                                        </View>

                                    </View>


                                )


                                }
                                <View style={styles.tableRow}>

                                    <View style={styles.tableCol_subtotal}>
                                        <Text style={styles.tableCell}>Sub Total S/ </Text>
                                    </View>
                                    <View style={styles.tableCol_subtotal_1}>
                                        <Text style={styles.tableCell}>{Number.parseFloat(sumatotal).toFixed(3)}</Text>
                                    </View>

                                </View>

                            </View>

                            <Text style={styles.solicitante} >
                                ___________________________
                            </Text>
                            <Text style={styles.solicitante_1} >
                                SOLICITANTE

                            </Text>
                            <Text style={styles.jefe_abast} >
                                JEFE DE ABASTECIMIENTO
                            </Text>
                            <Text style={styles.jefe_abast_1} >
                                ____________________________
                            </Text>
                            <Text style={styles.jefe_alm} >
                                JEFE DE ALMACEN
                            </Text>
                            <Text style={styles.jefe_alm_1} >
                                ___________________________
                            </Text>
                            <Text style={styles.recibi_con} >
                                RECIBI CONFORME
                            </Text>
                            <Text style={styles.recibi_con_1} >
                                ___________________________
                            </Text>


                            <Text
                                style={styles.pageNumber}
                                render={({ pageNumber, totalPages }) =>
                                    `${pageNumber} / ${totalPages}`
                                }
                            />
                        </Page>
                    </Document>
                </PDFViewer>

            </div>
        </>
    );
}


export default PdfNeas_cont;

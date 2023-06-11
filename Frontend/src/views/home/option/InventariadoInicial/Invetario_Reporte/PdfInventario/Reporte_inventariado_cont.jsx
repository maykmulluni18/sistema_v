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
//import "./pdfpecosa.scss"
import { DB_URL } from '../../../../../../config/config';
const URI = DB_URL + 'invetinicialfilterdate/'

// Create styles
const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth - 280,
        height: window.innerHeight - 130,
    },
    body: {
        paddingTop: 10,
        paddingBottom: 85,
        paddingHorizontal: 20,

    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    /* text: {
         margin: 12,
         fontSize: 14,
         textAlign: "justify",
     },*/
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    image: {
        width: 35,
        height: 35,
        top: 20,
        left: 20,
        position: "absolute"

    },
    header: {
        fontSize: 10,
        marginBottom: 20,
        textAlign: "center",
        color: "red",
    },
    header_subtitle: {
        color: "grey",
        fontSize: 6,
        left: 10,
        top: 5,
        paddingHorizontal: 35,

    },
    header_subtitle_oficina: {
        color: "grey",
        fontSize: 7,
        left: 10,
        top: 18,
        paddingHorizontal: 35,
    },
    header_subtitle_almacen: {
        color: "grey",
        fontSize: 6,
        left: 10,
        paddingHorizontal: 35,

    },
    header_title_principal: {
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: "center",
        color: "#212121",

    },
    header_title_principal_1: {
        fontWeight: 'bold',
        fontSize: 10,
        top: -10,
        textAlign: "center",
        color: "grey",
    },
    header_title_principal_2: {
        fontWeight: 'bold',
        fontSize: 10,
        top: -2,
        textAlign: "center",
        color: "grey",
    },
    text_vacio: {
        color: "white",
        fontSize: 4,
    },
    text_unidad_ejec: {
        color: "#212121",
        fontSize: 6,
        left: 10,
        top: "1%",

    },
    text_nro: {
        color: "#212121",
        fontSize: 6,
        left: 10,
        top: "1.5%",

    },
    text_almacen_obras: {
        color: "#212121",
        fontSize: 8,
        left: 10,
        top: "3%",
    },
    text_alamcen_sub: {
        color: "#212121",
        fontSize: 6,
        left: 270,
        top: "2%",
    },
    text_destino: {
        color: "#212121",
        fontSize: 6,
        left: 270,
        top: "2.5%",
    },
    text_filtro: {
        color: "#212121",
        fontSize: 6,
        left: 450,
        top: "1.5%",
    },
    text_fecha: {
        color: "grey",
        fontSize: 6,
        left: 450,
        top: "-13.5%",
    },
    text_pagina: {
        color: "grey",
        fontSize: 6,
        left: 450,
        top: "-12%",
    },
    text_hora: {
        color: "grey",
        fontSize: 6,
        left: 450,
        top: "-14.5%",
    },
    spacio: {
        color: "white",
        textAlign: 1,

    },
    pageNumber: {
        position: "absolute",
        fontSize: 6,
        bottom: 30,
        left: 440,
        right: 0,
        top: "5.3%",
        textAlign: "center",
        color: "grey",
    },
    table: {
        display: "table",
        width: "auto",
        top: "0.3% ",
        borderStyle: "solid",

    },

    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol_numero: {
        width: "9%",

    },

    tableCol_descripcion: {
        width: "38%",


    },
    tableCol_cuenta: {
        width: "12%",

    },
    tableCol_unidad: {
        width: "10%",


    },
    tableCol_cantidad: {
        width: "8%",

    },
    tableCol_precio: {
        width: "12%",

    },
    tableCol_total: {
        width: "7%",

    },
    tableCol_numero_1: {
        width: "9%",
        borderStyle: "solid",
        borderLeft: "1px solid gray",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",
    },

    tableCol_descripcion_1: {
        width: "38%",
        borderStyle: "solid",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",

    },
    tableCol_cuenta_1: {
        width: "12%",
        borderStyle: "solid",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",

    },
    tableCol_unidad_1: {
        width: "10%",
        borderStyle: "solid",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",

    },
    tableCol_cantidad_1: {
        width: "8%",
        borderStyle: "solid",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",

    },
    tableCol_precio_1: {
        width: "12%",
        borderStyle: "solid",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",

    },
    tableCol_total_1: {
        width: "7%",
        borderStyle: "solid",
        borderTop: "1px solid gray",
        borderBottom: "1px solid gray",
        borderRight: "1px solid gray",

    },
    tableCell: {

        marginTop: 1,
        fontSize: 6,
       // height: 6,
        textAlign: "center",

    },
    tableCell_cantidad: {
        fontSize: 6,
        textAlign: "center",

    },
    tableCell_unidad: {
        //color: "red",
        fontSize: 6,
        textAlign: "center",
        //margin: "auto",
    },
    Oficio: {
        fontSize: 6,
        color: "#212121",
        left: 10,
        paddingHorizontal: 18,
        fontWeight: "bold"
    },
    solicitante: {
        fontSize: 6,
        color: "#212121",
        //left: 10,
        left: 25,
        top: 180,
        fontWeight: "bold"
    },
    solicitante_1: {
        fontSize: 6,
        color: "#212121",
        //left: 10,
        left: 66,
        top: 182,
        fontWeight: "bold"
    },
    jefe_abast: {
        fontSize: 6,
        color: "#212121",
        //left: 10,
        left: 210,
        top: 158,
        fontWeight: "bold"
    },
    jefe_abast_1: {
        fontSize: 6,
        color: "#212121",
        //left: 10,
        left: 220,
        top: 160,
        fontWeight: "bold"
    },
    jefe_alm: {
        fontSize: 6,
        color: "#212121",
        //left: 10,
        left: 370,
        top: 66,
        fontWeight: "bold"
    },
    jefe_alm_1: {
        fontSize: 6,
        color: "#212121",
        //left: 10,
        left: 400,
        top: 68,
        fontWeight: "bold"
    },
    recibi_con: {
        fontSize: 6,
        color: "#212121",
        left: 600,
        top: 114,
        fontWeight: "bold"
    },
    recibi_con_1: {
        fontSize: 6,
        color: "#212121",
        left: 626,
        top: 116,
        fontWeight: "bold"
    }
});


const Reporte_inventariado_cont = () => {

    let today = new Date();
    let now = today.toLocaleTimeString('en-US');
    //console.log(now);

    let year = today.toLocaleDateString()
    //console.log(year);


    useEffect(() => {
        getInventarioInicial()
    }, [])

    const { fecha_registro } = useParams()
    
 

    const [fecha, setFecha] = useState('')
    const getPedidosPecosa_p = async () => {
        const res = await axios.get(URI + fecha_registro,)
        //console.log(res.data)
        setFecha(res.data)
    }

    const [inevtariadoInicialId, setInventariadoInicialId] = useState([])

    const getInventarioInicial = async () => {
        const res = await axios.get(URI + fecha_registro,)
        console.log(res.data)
        setInventariadoInicialId(res.data)
    }

    const [sumatotal, setSumatTotal] = useState(0)


    useEffect(() => {
        const getsumarTotal = () => {
            const total = inevtariadoInicialId.map((item) => parseFloat(item.cantidad_inicial * item.precio))
                .reduce((previus, current) => {
                    return previus + current;
                }, 0)
            console.log(total)
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
                <PDFViewer style={styles.viewer}>

                    <Document>
                        <Page size="A4" style={styles.body}>

                            <Image
                                style={styles.image}
                                src={UNAP_LOGO}
                                fixed
                            />
                            <Text style={styles.header} fixed></Text>
                            <Text style={styles.header_subtitle} fixed>
                                SISTEMA INTEGRADO DE GESTION ADMINISTRATIVAS

                            </Text>
                            <Text style={styles.header_subtitle_oficina} fixed>
                                MODULO DE LOGISTICA
                            </Text>
                            <Text style={styles.header_subtitle_almacen} fixed>
                                VERSION 22.04.00.U2
                            </Text>
                            <Text style={styles.header_title_principal} fixed>
                                INVENTARIADO INICIAL
                            </Text>
                            <Text style={styles.header_title_principal_1} fixed>
                                _____________________
                            </Text>
                            <Text style={styles.header_title_principal_2} fixed>
                                Año {year}
                            </Text>
                            <Text style={styles.text_vacio} fixed>
                                vacio
                            </Text>
                            <Text style={styles.text_unidad_ejec} fixed>
                                UNIDAD EJECUTORA:  001 UNIVERSIDAD NACIONAL DEL ALTIPLANO
                            </Text>
                            <Text style={styles.text_nro} fixed>
                                NRO. IDENTIFICACIÓN: 000098
                            </Text>
                            <Text style={styles.text_almacen_obras} fixed>
                                ALMACEN: ALAMCEN CENTRAL-OBRAS
                            </Text>
                            <Text style={styles.text_alamcen_sub} fixed>
                                SUB ALMACEN: ALMACEN CENTRAL - OBRAS
                            </Text>
                            <Text style={styles.text_destino} fixed>
                                DESTINO DE USO: CONSUMO
                            </Text>
                            <Text style={styles.text_filtro} fixed>
                                FILTRO: TODOS
                            </Text>
                            
                            <Text style={styles.text_pagina} fixed>
                                PAGINAS:
                            </Text>
                            <Text style={styles.text_hora} fixed>
                                HORA: {now}
                            </Text>


                            <View style={styles.table}>
                                <View style={styles.tableRow} fixed>

                                    <View style={styles.tableCol_numero_1}>
                                        <Text style={styles.tableCell}>ITEM</Text>
                                    </View>
                                    <View style={styles.tableCol_descripcion_1}>
                                        <Text style={styles.tableCell}>MARCA</Text>
                                    </View>
                                    <View style={styles.tableCol_cuenta_1}>
                                        <Text style={styles.tableCell}>CUENTA</Text>
                                    </View>
                                    <View style={styles.tableCol_unidad_1}>
                                        <Text style={styles.tableCell}>UNIDAD</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad_1}>
                                        <Text style={styles.tableCell}>CANTIDAD</Text>
                                    </View>
                                    <View style={styles.tableCol_precio_1}>
                                        <Text style={styles.tableCell}>PRECIO</Text>
                                    </View>
                                    <View style={styles.tableCol_total_1}>
                                        <Text style={styles.tableCell}>VALOR TOTAL</Text>
                                    </View>

                                </View>



                                {inevtariadoInicialId.map((x, i) =>

                                    <View style={styles.tableRow} key={`BR${i}`}>
                                        <View style={styles.tableCol_numero}>
                                            <Text style={styles.tableCell}>{x.biene.item}</Text>
                                        </View>
                                        <View style={styles.tableCol_descripcion}>
                                            <Text style={styles.tableCell}>{x.biene.description}</Text>
                                        </View>
                                        <View style={styles.tableCol_cuenta}>
                                            <Text style={styles.tableCell_unidad}>{x.cuenta}</Text>
                                        </View>
                                        <View style={styles.tableCol_unidad}>
                                            <Text style={styles.tableCell}>{x.biene.unidad_de_medida}</Text>
                                        </View>
                                        <View style={styles.tableCol_cantidad}>
                                            <Text style={styles.tableCell}>{x.cantidad}</Text>
                                        </View>
                                        <View style={styles.tableCol_precio}>
                                            <Text style={styles.tableCell}>{x.precio}</Text>
                                        </View>

                                        <View style={styles.tableCol_total}>
                                            <Text style={styles.tableCell}>{Number.parseFloat(x.cantidad_inicial * x.precio).toFixed(2)}</Text>
                                        </View>

                                    </View>


                                )


                                }
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol_numero}>
                                        <Text style={styles.tableCell}>.</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad}>
                                        <Text style={styles.tableCell}>.</Text>
                                    </View>
                                    <View style={styles.tableCol_unidad}>
                                        <Text style={styles.tableCell}>.</Text>
                                    </View>
                                    <View style={styles.tableCol_descripcion}>
                                        <Text style={styles.tableCell}>.</Text>
                                    </View>
                                    <View style={styles.tableCol_codigo}>
                                        <Text style={styles.tableCell}>.</Text>
                                    </View>
                                    <View style={styles.tableCol_cantidad}>
                                        <Text style={styles.tableCell}>.</Text>
                                    </View>
                                    <View style={styles.tableCol_unitario}>
                                        <Text style={styles.tableCell}>VALOR GENERAL</Text>
                                    </View>
                                    <View style={styles.tableCol_total}>
                                        <Text style={styles.tableCell}>S/</Text>
                                    </View>
                                    <View style={styles.tableCol_observacion}>
                                        <Text style={styles.tableCell}>{sumatotal}</Text>
                                    </View>
                                </View>

                            </View>
                            <Text style={styles.jefe_alm} fixed>
                                ___________________________
                            </Text>
                            <Text style={styles.jefe_alm_1} fixed>
                                JEFE DE ALMACEN
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


export default Reporte_inventariado_cont;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Page, Text, View,
    Document, StyleSheet,
    PDFDownloadLink, PDFViewer, Image
} from '@react-pdf/renderer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UNAP_LOGO from "../.././../image/UNAP.png"
import "./pdfpecosa.scss"
import { DB_URL } from '../../../../../../config/config';

const URI = DB_URL + 'pecosapedidos/'
const URI1 = DB_URL + 'pecosabienespedidos/'
const URI2 = DB_URL + 'metas/'
const URI3 = DB_URL + 'bienes/'

// Create styles
const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth - 280,
        height: window.innerHeight - 130,
    },
    body: {
        paddingTop: 5,
        paddingBottom: 20,
        paddingHorizontal: 20,

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
        color: "red",
    },
    header_subtitle: {
        color: "grey",
        fontSize: 8,
        left: 50,
        top: 5,
        paddingHorizontal: 35,

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
        width: "96%",
        left: "2.3%",
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
        left: "56%",
        paddingHorizontal: 16,
        top: "53%",


    },
    entregar_a: {
        fontSize: 8,
        color: "#212121",
        right: "1.5%",
        paddingHorizontal: 16,
        top: "32%",

    },
    /*tipo_moneda: {
        fontSize: 8,
        color: "#212121",
        left: "56%",
        paddingHorizontal: 16,
        top: "-49%",
        borderLeft: "1px solid gray",
    },*/
    fecha_nea: {
        fontSize: 8,
        color: "#212121",
        left: "56%",
        paddingHorizontal: 16,
        top: "-18%",
    },

    almacen: {
        fontSize: 8,
        color: "#212121",
        left: "56%",
        paddingHorizontal: 16,
        top: "-32%",
    },
    destino: {
        fontSize: 8,
        color: "#212121",
        right: "1.5%",
        paddingHorizontal: 16,
        top: "-20%",
    },
    tipo_almacen: {
        fontSize: 8,
        color: "#212121",
        left: "56%",
        borderLeft: "1px solid gray",
        paddingHorizontal: 16,
        top: "-23%",
    },
    tipo_documento: {
        fontSize: 8,
        color: "#212121",
        left: "56%",
        paddingHorizontal: 16,
        top: "-14%",
        borderLeft: "1px solid gray",
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
    fecha_actual: {
        width: "8%",
        left: "80.5%",
        height: "10%",
        top: "-28%",
        fontSize: "10px",
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
        width: "45%",
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
        width: "9%",
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
        width: "78%",
        borderStyle: "solid",
        border: "1px solid gray",
        textAlign: "left",

    },
    tableCol_subtotal_1: {
        width: "18%",
        borderStyle: "solid",
        border: "1px solid gray",
    },
    Oficio: {
        fontSize: 8,
        color: "#212121",
        left: 5,
        top: 12,
        paddingHorizontal: 18,
        fontWeight: "bold"
    },
    solicitante: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: "5.5%",
        top: 46,
        fontWeight: "bold"

    },
    solicitante_1: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: "9.5%",
        top: 48,
        fontWeight: "bold"
    },
    jefe_abast: {
        fontSize: 8,
        color: "#212121",
        left: 240,
        top: 41,
        fontWeight: "bold"
    },
    jefe_abast_1: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 230,
        top: 22.5,
        fontWeight: "bold"
    },
    jefe_alm: {
        fontSize: 8,
        color: "#212121",
        //left: 10,
        left: 446,
        top: 25,
        fontWeight: "bold"
    },
    jefe_alm_1: {
        fontSize: 8,
        color: "#212121",
        left: 420,
        top: 7,
        fontWeight: "bold"
    },
    recibi_con: {
        fontSize: 8,
        color: "#212121",
        left: 636,
        top: 10,
        fontWeight: "bold"
    },
    recibi_con_1: {
        fontSize: 8,
        color: "#212121",
        left: 610,
        top: -8,
        fontWeight: "bold"
    }

});


const PdfReporte_cont = () => {
    //const [contend,getContent] = useState([])
    var today = new Date();
    var now = today.toLocaleTimeString('en-US');
    console.log(now);

    var date = today.toLocaleDateString()
    console.log(date);

    useEffect(() => {
        getPedidosPecosa_p()
        getPecosaBienes()
        getBienes()
    }, [])

    const { id } = useParams()


    const [dependencias, setDependencias] = useState('')
    const [tipo_de_sede, setTipoDeSede] = useState('')
    const [fecha, setFecha] = useState('')
    const [almacen, setAlmacen] = useState('')
    const [id_administradores, setIdAdministradores] = useState('')
    const [id_administrativo2, setIdAdministrativo2] = useState('')
    const [id_metas, setIdMetas] = useState('')
    const getPedidosPecosa_p = async () => {

        const res = await axios.get(URI + id,)
        setDependencias(res.data.dependencias)
        setTipoDeSede(res.data.tipo_de_sede)
        setAlmacen(res.data.almacen)
        setFecha(res.data.fecha)
        setIdAdministradores(res.data.usuario.nombres + ' ' +
            res.data.usuario.apellido_paterno + ' ' +
            res.data.usuario.apellido_materno)
        setIdAdministrativo2(res.data.usuario.nombres + ' ' +
            res.data.usuario.apellido_paterno + ' ' +
            res.data.usuario.apellido_materno)
        setIdMetas(res.data.Meta.meta_1 + '  y  ' + res.data.Meta.meta_1)
    }

    const [pecosaPedidoId, setPecosaPedidosId] = useState([])

    const getPecosaBienes = async () => {
        const res = await axios.get(URI1 + id,)

        console.log(res.data)
        setPecosaPedidosId(res.data)
    }
    const [idBienes, setIdBien] = useState('')
    const getBienes = async () => {
        const res = await axios.get(URI3, idBienes)
        console.log(res.data)
    }

    const [sumatotal, setSumatTotal] = useState(0)


    useEffect(() => {
        const getsumarTotal = () => {
            const total = pecosaPedidoId.map((item) => parseFloat(item.cantidad * item.inventarido_inicial?.precio || item.nea_bien?.p_unitario))
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
                                UNIDAD DE ABASTECIMIENTO
                            </Text>
                            <Text style={styles.header_subtitle_almacen} fixed>
                                ALMACEN CENTRAL
                            </Text>
                            <Text style={styles.header_title_principal} fixed>
                                PEDIDO DE COMPROBANTE DE SALIDA (PECOSA)
                            </Text>
                            <Text style={styles.header_title_principal_2} fixed>
                                Nro Salida: {id.padStart(4, 0)}
                            </Text>

                            {/* <Image style={styles.image} src={LebronStretch} />*/}
                            <Text style={styles.text_vacio} fixed>
                                vacio
                            </Text>
                            <View style={styles.gen_depen} fixed>
                                <Text style={styles.dependencias} fixed>
                                    <Text>DEPENDENCIA SOLICITANTE   :</Text>   {dependencias}
                                </Text>
                                <Text style={styles.usuario} fixed>
                                    <Text fixed>SOLICITANTE                              :</Text>    {id_administradores}
                                </Text>
                                <Text style={styles.destino_a} fixed>
                                    <Text>ALMACEN                        :</Text>   {tipo_de_sede}
                                </Text>
                                <Text style={styles.entregar_a} fixed>
                                    <Text>SOLICITO ENTREGAR A </Text>           :<Text>   {id_administrativo2} </Text>
                                </Text>

                                <Text style={styles.almacen} fixed>
                                    <Text fixed>CADENA FUNCIONAL </Text>   :<Text>   {id_metas} </Text>
                                </Text>
                               {/*  <Text style={styles.almacen} fixed>
                                    <Text fixed>ALMACEN:         </Text>   :<Text>   ALMACEN CENTRAL </Text>
                                </Text>*/}
                                <Text style={styles.destino} fixed>
                                    <Text fixed>DESTINO                             </Text>        :<Text>   {dependencias} </Text>
                                </Text>
                                <Text style={styles.fecha_nea} fixed>
                                    <Text fixed>FECHA PECOSA          </Text>   :<Text>   {fecha} </Text>
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
                                    {date} {now}
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
                                        <Text style={styles.tableCell} >CODIGO</Text>
                                    </View>
                                    <View style={styles.tableCol_codigo} >
                                        <Text style={styles.tableCell} >P.UNITARIO</Text>
                                    </View>

                                    <View style={styles.tableCol_unitario} >
                                        <Text style={styles.tableCell} >VALOR TOTAL</Text>
                                    </View>
                                    <View style={styles.tableCol_total} >
                                        <Text style={styles.tableCell} >OBSERCIONES</Text>
                                    </View>
                                </View>

                                {pecosaPedidoId.map((x, i) =>

                                    <View style={styles.tableRow} key={`BR${i}`}>
                                        <View style={styles.tableCol_numero}>
                                            <Text style={styles.tableCell}>{i + 1}</Text>
                                        </View>
                                        <View style={styles.tableCol_cantidad}>
                                            <Text style={styles.tableCell}>{x?.cantidad}</Text>
                                        </View>
                                        <View style={styles.tableCol_descripcion}>
                                            <Text style={styles.tableCell_des}>{x.inventarido_inicial?.biene.description.toUpperCase() || x.nea_bien?.biene.description.toUpperCase()} - {x?.descripcion.toUpperCase()}</Text>
                                        </View>
                                        <View style={styles.tableCol_unidad}>
                                            <Text style={styles.tableCell}>{x.inventarido_inicial?.biene.unidad_de_medida || x.nea_bien?.biene.unidad_de_medida}</Text>
                                        </View>
                                        <View style={styles.tableCol_fte}>
                                            <Text style={styles.tableCell}>{x.inventarido_inicial?.cuenta || x.nea_bien?.cuenta_contable}</Text>
                                        </View>

                                        <View style={styles.tableCol_unitario}>
                                            <Text style={styles.tableCell}>{x.inventarido_inicial?.precio || x.nea_bien?.p_unitario}</Text>
                                        </View>
                                        <View style={styles.tableCol_total}>
                                            <Text style={styles.tableCell}>{Number.parseFloat(x.cantidad * x.inventarido_inicial?.precio || x.nea_bien?.p_unitario).toFixed(3)}</Text>
                                        </View>
                                        <View style={styles.tableCol_codigo}>
                                            <Text style={styles.tableCell}>{x?.observaciones}</Text>
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

                            <Text style={styles.solicitante} fixed>
                                ___________________________
                            </Text>
                            <Text style={styles.solicitante_1} fixed>
                                SOLICITANTE

                            </Text>
                            <Text style={styles.jefe_abast} fixed>
                                JEFE DE ABASTECIMIENTO
                            </Text>
                            <Text style={styles.jefe_abast_1} fixed>
                                ____________________________
                            </Text>
                            <Text style={styles.jefe_alm} fixed>
                                JEFE DE ALMACEN
                            </Text>
                            <Text style={styles.jefe_alm_1} fixed>
                                ___________________________
                            </Text>
                            <Text style={styles.recibi_con} fixed>
                                RECIBI CONFORME
                            </Text>
                            <Text style={styles.recibi_con_1} fixed>
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


export default PdfReporte_cont;

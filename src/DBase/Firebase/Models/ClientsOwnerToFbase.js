module.exports = ClientsOwnerToFbase = {
    nombres: '',
    apellidos: '',
    tipoIdent: '',
    NoIdent: '',
    clav_product_: '',
    tel: '',
    email: '',
    pais: '',
    pswr: '',
    datosBancarios: '',
    GetDatos: () => {
        return {
            nombres: this.nombres,
            apellidos: this.apellidos,
            tipoIdent: this.tipoIdent,
            NoIdent: this.NoIdent,
            clav_product_: this.clav_product_,
            tel: this.tel,
            email: this.email,
            pais: this.pais,
            pswr: this.pswr,
            datosBancarios: this.datosBancarios
        }
    },
    SetDatos: () => {
        this.nombres = datos.nombres
        this.apellidos = datos.apellidos
        this.tipoIdent = datos.tipoIdent
        this.NoIdent = datos.NoIdent
        this.clav_product_ = datos.clav_product_
        this.tel = datos.tel
        this.email = datos.email
        this.pais = datos.pais
        this.pswr = datos.pswr
        this.datosBancarios = datos.datosBancarios
    },
    ConsultarDatosEnFBase: async (NoIdent__, clav_prodct__) => {

        console.log('Analizando producto ' + NoIdent__ );
        let resp = false
        let docdata = null
        await require('../Instancia_CLIENTES_collect')()
            .then((RESP_Instancia_CLIENTES_collect) => {
                if (RESP_Instancia_CLIENTES_collect !== undefined) {
                    RESP_Instancia_CLIENTES_collect.forEach((doc) => {
                        docdata = doc.data() //los clientes
                        if (docdata.NoIdent === NoIdent__ && docdata.clav_product_ === clav_prodct__) {
                            console.log(`CLIENTE ${NoIdent__} habilitado`);
                            resp = true
                        }
                    });
                }
                if (RESP_Instancia_CLIENTES_collect === undefined) {
                    console.log('sin datos')
                }
            })
            .catch((err) => {
                console.log('bad', err);
                resp = null
            })
        return resp




    }
}
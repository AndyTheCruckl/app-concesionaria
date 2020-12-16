const autos = require('./autos');

let comprador = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 7200,
    capacidadDePagoTotal: 100000     
}

const concesionaria = {
    autos: autos,

    buscarAuto: function (patent){
        let encontreAuto 
        let noEncontreAuto = null

        for (let i = 0; i < this.autos.length; i++) {
            if (patent == this.autos[i].patente) {
                encontreAuto = this.autos[i]
            }            
        }
        return (encontreAuto != null ) ? encontreAuto : noEncontreAuto
    },

    venderAuto: function (patent){
        this.buscarAuto(patent).vendido = true
        },

    autosParaLaVenta: function () {
        let todosLosAutos = this.autos
        let autosEnVenta = todosLosAutos.filter(function(elAuto) {
            return elAuto.vendido == false 
        })
        return autosEnVenta
    },

    autosNuevos: function () {
        let todosLosAutosEnVenta = this.autosParaLaVenta()    
        let autosEnVentaNuevos = todosLosAutosEnVenta.filter(function(elAuto) {
            return elAuto.km < 100 
        }) 
        return autosEnVentaNuevos
    },

    listaDeVentas: function () {
        let todosLosAutos = this.autos
        let todosLosAutosVendidos = todosLosAutos.filter(function(elAuto) {
            let vendidos = elAuto.vendido == true 
            return vendidos
        })
        let listaVendidos = todosLosAutosVendidos.map(function(precios){
            return precios.precio 
        })
        return listaVendidos
    },

    totalDeVentas: function () {
        let listaDeVendidos = this.listaDeVentas()
        if (listaDeVendidos.length != 0 ) {
            let sumaVentas = listaDeVendidos.reduce(function(acum, num){
                return acum + num;
            })
            return sumaVentas
        }else{
            return 0
        }
    },

    puedeComprar: function (auto, cliente) {
        let precioAuto = auto.precio
        let precioPorCuota = precioAuto/ auto.cuotas
        let capacidadDePagoTotal = cliente.capacidadDePagoTotal
        let capacidadDePagoEnCuotas = cliente.capacidadDePagoEnCuotas
        let puede

        if (capacidadDePagoTotal >= precioAuto && capacidadDePagoEnCuotas > precioPorCuota) {
            puede = true
        }else{
            puede = false
        }
        return puede
    },

    autosQuePuedeComprar: function (cliente) {
        let autosParaVenta = this.autosParaLaVenta()
        let comprador = cliente
        let arrayPuedeComprar= []
        let retornoFor

        for (let i = 0; i < autosParaVenta.length; i++) {
            retornoFor = this.puedeComprar(autosParaVenta[i], comprador)
            arrayPuedeComprar.push(retornoFor)
        }

        let autosParaVentaQuePuedeComprar = []

        for (let i = 0; i <= arrayPuedeComprar.length; i++) {
            console.log(i);
            if (arrayPuedeComprar[i] === true) {    
                autosParaVentaQuePuedeComprar.push(autosParaVenta[i])
            }
            
        }
        
        return autosParaVentaQuePuedeComprar
    }
}


concesionaria.autosQuePuedeComprar(comprador)
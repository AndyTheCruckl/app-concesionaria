const autos = require('./autos');



let comprador = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 7200,
    capacidadDePagoTotal: 100000000
        
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

        let estoyAlmacenando

        autosParaVenta.filter(function (elAuto) {
            arrayPuedeComprar.filter(function (trueOrFalse) {
                // if (trueOrFalse == true) {
                //     return autosParaVentaQuePuedeComprar.push(elAuto)
                // }
                console.log(trueOrFalse);
            })
            
        }) 
        // return autosParaVentaQuePuedeComprar
    }
}
// console.log(concesionaria.autos + "Aqui termina el console.log");



// concesionaria.venderAuto("APL123");


// console.log(concesionaria.autos + "Aqui termina el console.log");
// console.log(concesionaria.autosParaLaVenta());


// console.log(concesionaria.autosNuevos());

// console.log(concesionaria.listaDeVentas());

// console.log(concesionaria.totalDeVentas());

// console.log(concesionaria.puedeComprar(concesionaria.autosParaLaVenta()[1], comprador));

// console.log(concesionaria.autosQuePuedeComprar(comprador));
concesionaria.autosQuePuedeComprar(comprador)
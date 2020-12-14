let concesionaria = {
    autos: autos
}


function buscarAuto(patent){
    let encontreMarca 
    let noEncontreMarca 
    for(i = 0; i < concesionaria.autos.length; i++ ){
        if (patent == concesionaria.autos[i].patente){
            encontreMarca = autos[i].marca
        }else{
            noEncontreMarca = null
        }
    }
    return (encontreMarca != null ) ? encontreMarca : noEncontreMarca
}

module.exports = buscarAuto
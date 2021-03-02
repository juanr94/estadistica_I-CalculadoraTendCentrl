
class tendeciaCentral{
            
    agreagarDatos(datos){
        this.datos=datos;
    }

    obtenerDatos(){
        return this.datos;
    }

    datoMenor(){
        var menor = this.obtenerDatos()[0];
        for(var i = 0; i< this.obtenerDatos().length; i++)
        {
            if(menor > this.obtenerDatos()[i])
            {
                menor = this.obtenerDatos()[i];
            }
        }
        return menor;
    }

    datoMayor(){
        var mayor = this.obtenerDatos()[0];
        for(var i = 0; i< this.obtenerDatos().length; i++)
        {
            if(mayor < this.obtenerDatos()[i])
            {
                mayor = this.obtenerDatos()[i];
            }
        }
        return mayor;
    }

    nIntervalo(){
        var k = 0;
        var nInt = document.getElementById("noIntervalo").value;

        if(parseInt(nInt) === 0)
        {
            k = 1 + 3.322 * Math.log10(this.obtenerDatos().length);
        }
        else if (parseInt(nInt) > 0)
        {
            k = parseInt(nInt);
        }
        
        return k;
    }

    rango(){
        var r = this.datoMayor() - this.datoMenor();
        
        return r;
    }

    amplitud(){
        var a = this.rango() / this.nIntervalo();
        return a + 0.00000005;
    }

    limInferior(){
        var li=[]
        li.push(this.datoMenor());
        for(var i = 1; i< this.nIntervalo(); i++){
            li[i] = li[i-1] + this.amplitud();
        }

        return li;
    }

    limSuperior(){
        var ls=[]
        ls.push((this.datoMenor() + this.amplitud()));
        for(var i = 1; i < this.nIntervalo(); i++){
            ls[i] = ls[i-1] + this.amplitud();
        }
        return ls;
    }

    marcaClase(){
        var marcaClase=[];
        for(var i = 0; i < this.nIntervalo(); i++ )
        {
            marcaClase[i] = (this.limInferior()[i] + this.limSuperior()[i]) / 2;
        }

        return marcaClase;
    }

    frecuencia(){
        var f=[];
        var c;
        for(var i = 0; i < this.nIntervalo(); i++ )
        {
            var li = this.limInferior()[i];
            var ls = this.limSuperior()[i];
            // Iniciamos la variable por cada vuelat en 'i' en cero para que no sobre escriba
            c =0;
            for(var j = 0; j < this.obtenerDatos().length; j++ )
            {
               if(this.obtenerDatos()[j] >= li && this.obtenerDatos()[j] < ls)
               {
                  c++;
                    
                } 
            }

            f[i] = c;
        }
        return f;
    }

    totalFreceuncia(){
        var tf = 0;
        for(var i = 0; i< this.nIntervalo(); i++)
        {
            tf += this.frecuencia()[i];
        }
        return tf;
    }

    frecuenciaRelativa(){
        var fr = [];
        for(var i =0; i < this.nIntervalo(); i++ ){
            fr[i] = this.frecuencia()[i] / this.totalFreceuncia();
        }

        return fr;
    }

    frecuenciaRelativaAcumulada(){
        var frAcumulada = [];
        var fra = 0;
        for(var i = 0; i < this.nIntervalo(); i++){
            fra = fra + this.frecuencia()[i];
            frAcumulada[i] = fra;
        }
        return frAcumulada;
    }
    //===================== Medidas de disperción ======================================

    promedio(){
        var prom = 0;
        for(var i = 0; i < this.nIntervalo(); i++ ){
            prom += (this.marcaClase()[i] * this.frecuencia()[i]); 
        }

        return prom/this.obtenerDatos().length;
    }


    varianza(){
        var numerador = 0;
        for(var i = 0; i < this.nIntervalo(); i++ ){
            numerador += (Math.pow((this.marcaClase()[i] - this.promedio()),2) * this.frecuencia()[i]);
        }

        return numerador/this.obtenerDatos().length;
    }

    desviacionEstandar(){
        return Math.sqrt(this.varianza());
    }

    mediana(){
        var cantDatos = this.obtenerDatos().length;
        var parinpar = 0;
        var me = 0;

        if(cantDatos % 2 == 0)
        {
            parinpar = cantDatos / 2;

        }
        else{
            parinpar = (cantDatos + 1) / 2;
        }

        
        for(var i = 0; i < this.nIntervalo(); i++ ){
              
            if(this.frecuenciaRelativaAcumulada()[i] === parinpar){
                me = parinpar;
                break;   
            }
        
        }

       

        if(me === 0){
            for(var i = 0; i < this.nIntervalo(); i++ ){
                if(this.frecuenciaRelativaAcumulada()[i] > parinpar){
                    if (isNaN(this.frecuenciaRelativaAcumulada()[i-1])){
                        me = this.limInferior()[i] + (((this.obtenerDatos().length/2) - 0) / this.frecuencia()[i]) * this.amplitud();
                        break;
                    }
                    else{
                        me = this.limInferior()[i] + (((this.obtenerDatos().length/2) - this.frecuenciaRelativaAcumulada()[i-1]) / this.frecuencia()[i]) * this.amplitud();
                        break;
                    }
                }
                
            }
        }
        return me;

    }

    moda(){
        var fMayor = this.frecuencia()[0];
        var p = 0;
        var mo = 0;

        for(var i = 0; i < this.nIntervalo(); i++ ){

            if(fMayor < this.frecuencia()[i]){
                fMayor = this.frecuencia()[i];
                p = i;
            }
        }

        if(isNaN(this.frecuencia()[p-1])){
            mo = this.limInferior()[p] + ((this.frecuencia()[p] - 0) / ((this.frecuencia()[p] - 0) + (this.frecuencia()[p] - this.frecuencia()[p+1]))) * this.amplitud();
        }
        else if (isNaN(this.frecuencia()[p+1]))
        {
            mo = this.limInferior()[p] + ((this.frecuencia()[p] - this.frecuencia()[p-1]) / ((this.frecuencia()[p] - this.frecuencia()[p-1]) + (this.frecuencia()[p] - 0))) * this.amplitud();
        }
        else{
            mo = this.limInferior()[p] + ((this.frecuencia()[p] - this.frecuencia()[p-1]) / ((this.frecuencia()[p] - this.frecuencia()[p-1]) + (this.frecuencia()[p] - this.frecuencia()[p+1]))) * this.amplitud();
        }
        
        if (isNaN(mo)){
            mo = 0;
        }

        return mo;
    }


}

var tc = new tendeciaCentral();

var btnCrearT = document.getElementById("crearTabla");



function deleteRow(id,row) {
    document.getElementById(id).deleteRow(row);
}

function redondear(numero){
    return parseFloat(Math.round(numero * 100) / 100).toFixed(2);
}

function añadirValores(){
    var dt = document.getElementById("dato").value;
    var limpiar = document.getElementById("dato");
    var dts = parseFloat(dt);  

        if(dts !=null)
        {
            if(!isNaN(dts) && isFinite(dts) && (dts > 0) && (typeof(dts) === 'number')){
                insRow("tablaDts");
                btnCrearT.disabled = false;
                btnCrearT.style.cursor = 'pointer';
                dts.value = "";
                limpiar.value = "";
            }else{
                alert("Inserte datos de tipo numericos que no sean letras o números menores a cero");     
           }
            
        }
        else
        {
            alert("Debe de ingresar dato...");
        }
}

function tableclick(e) {
    var tablaDatos = document.getElementById("tablaDts");
    var btnAgregarDatos = document.getElementById("crearTabla");

    if(!e){
        e = window.event;
    }
    //Obtiene el elemento que desencadenó un evento específico
    if(e.target.value == "Delete"){
        deleteRow('tablaDts', e.target.parentNode.parentNode.rowIndex );
        if(tablaDatos.rows.length <= 1){
            btnCrearT.disabled = true;
            btnAgregarDatos.style.cursor = "not-allowed";
        } 
    }   
}

// Pasamos como argumento el id de la tabla que queremos agregarle la fila
function insRow(id) {
    var dato = document.getElementById("dato").value;
    var filas = document.getElementById(id).rows.length;
    var xFilas = document.getElementById(id).insertRow(filas);
    //Variables que almacena las celdas (número y el boton de eliminar )
    var yCelda = xFilas.insertCell(0);
    var zCelda = xFilas.insertCell(1);
    yCelda.innerHTML = dato;
    zCelda.innerHTML ='<button id="btnE" name="btn" value = "Delete" >x</button>';
}

function datosAñadir(){
  
    var filas = document.getElementById("tablaDts").rows.length;
    var valores = [];
    for (var i =0; i<filas;i++)
    {
        valores[i]=parseFloat(document.getElementById("tablaDts").rows[i].cells[0].innerHTML);
    }
    
    tc.agreagarDatos(valores);
}

function limpiarTabla(id){ 
    var tabla = document.getElementById(id);
    while(tabla.rows.length > 1){
        tabla.deleteRow(1);
    }

}

function crearTablaFr(){
    var fila = [];
    var agFila = [];
    // Se rrecorre latabla con la cantidad de números de intervalos posibles
    for(var i = 0; i< tc.nIntervalo(); i++){
        // Se agregra al array cada uno de los valores que tendrá cada fila y sus celdas
        fila[i] = '<tr><td>'+(i + 1)+'</td><td>'+'['+redondear(tc.limInferior()[i])+' - '+redondear(tc.limSuperior()[i])+')'+
                  '</td><td>'+redondear(tc.marcaClase()[i])+'</td><td>'+redondear(tc.frecuencia()[i])+'</td><td>'+redondear(tc.frecuenciaRelativa()[i])+
                  '</td><td>'+Math.round(redondear(tc.frecuenciaRelativa()[i])*100)+'</td><td>'+redondear(tc.frecuenciaRelativaAcumulada()[i])+'</td><tr>';
        
        // Para agregar la fila a la tabla se crea una nueva fila y se almacena a un array
        agFila[i] = document.createElement("tr");
        // La fila nueva creada se le agrega la fila 
        agFila[i].innerHTML = fila[i];
        // Con <<appendChild()>> se le agrega la fila a la tabla que deseamos
        document.getElementById("tablaF").appendChild(agFila[i]);
    }
}

function addTendenciaCtrl(){
   var media = document.getElementById("media-v"); 
   var mediana = document.getElementById("mediana-v");
   var des_stand = document.getElementById("desv-estandar-v");
   var moda = document.getElementById("moda-v");
        media.innerHTML = redondear(tc.promedio());
        mediana.innerHTML = redondear(tc.mediana());
        des_stand.innerHTML = redondear(tc.desviacionEstandar());
        moda.innerHTML = redondear(tc.moda());

}

function eventos(){

    document.getElementById("add-datos").addEventListener('click',function(){
        var v_modal = document.getElementById("fondo-modal");
        v_modal.style.display = "inline"; 
    },false);

    document.getElementById("modal-cerrar").addEventListener('click',function(){
        var v_modal = document.getElementById("fondo-modal");
        v_modal.style.display = "none"; 
    },false);

    document.getElementById('tablaDts').addEventListener('click',tableclick,false);

    document.getElementById('agregarDat').addEventListener("click",function(){
            var limpiar = document.getElementById("dato");
            añadirValores();
            limpiar.value = "";
    },false);

    document.getElementById("crearTabla").addEventListener("click",function(){
        limpiarTabla('tablaF');
        //limpiarTabla('tendenciaCentral');
        datosAñadir();
        crearTablaFr();
        addTendenciaCtrl();
        var check = document.getElementById("check");
        check.disabled = false;
        console.log('Rango '+ tc.rango());
    },false);

    document.getElementById("dato").addEventListener("keydown",function(e){
        
        if(e.key == "Enter"){
            añadirValores();
            
        }
        
    },false);

    document.getElementById("check").addEventListener("change",function(){
        var nInter = document.getElementById("noIntervalo");
        var btnInter = document.getElementById("ajustarT");
        var txtDatos = document.getElementById("dato");
        var btnCrearTbl = document.getElementById("crearTabla");
        nInter.value = 0;
        if(this.checked){
            nInter.disabled = false;
            btnInter.disabled = false;
            btnInter.style.cursor = 'pointer';
            txtDatos.disabled = true;
            txtDatos.style.cursor = 'not-allowed';
            btnCrearTbl.disabled = true;
            btnCrearTbl.style.cursor = 'not-allowed';
            
        }
        else{
            nInter.disabled = true;
            btnInter.disabled = true;
            btnInter.style.cursor = 'not-allowed';
            txtDatos.disabled = false;
            txtDatos.style.cursor = 'pointer';
            btnCrearTbl.disabled = false;
            btnCrearTbl.style.cursor = 'pointer';
        }
        
    },false);

    document.getElementById("ajustarT").addEventListener("click",function(){

            limpiarTabla('tablaF');
            //limpiarTabla('tendenciaCentral');
            datosAñadir();
            crearTablaFr();
            addTendenciaCtrl();

    },false);
}

window.addEventListener("load",eventos(),false);
 
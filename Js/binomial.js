class binomial{

    constructor(n,p,x){
        this.n = n;
        this.p = p;
        this.x = x;
    }

    factorial (x)
    {
        let num = 1; 
        if (x < 0){
            num = NaN;
        }
        else if(x === 0 || x === 1){
            num = 1;
        }

        while(x >= 2){
            num *= x;
            x--;
        }

        return num;
    }

    combinacion(n,x)
    {

        let diferencia = n - x;
        let comb = this.factorial(n) / (this.factorial(x) * this.factorial(diferencia)); 
    
        return comb;
    }

    resultadoBinomial()
    {
        let conv = this.combinacion(this.n,this.x);

        let P = conv * Math.pow(this.p,this.x) * Math.pow((1 - this.p),(this.n - this.x));

        return parseFloat((P*100)/100).toFixed(4);
    }

    resultadoBinomialAcumulada(){
        
        let acumulada = 0;

        for(let i = 0; i <= this.x; i++)
        {
            let conv = this.combinacion(this.n,i);
            acumulada += conv * Math.pow(this.p,i) * Math.pow((1 - this.p),(this.n - i));
        }

        return parseFloat((acumulada*100)/100).toFixed(4);
    }

}


function agregarDtsBinomial() {

    let selecion = document.getElementById("tipo-binomial");
    let n = parseInt(document.getElementById("n-ensayos").value);
    let p = parseFloat(document.getElementById("probabilidad").value);
    let x = parseInt(document.getElementById("x").value);
    
    if(n >= x){
        let b = new binomial(n,p,x);

        if(selecion.value === "Distribución binomial")
        {
            document.getElementById("respuesta-B").innerHTML = "P(X="+x+") = "+b.resultadoBinomial(); 
        }
        else if (selecion.value === "Distribución binomial acumulada")
        {
            document.getElementById("respuesta-B").innerHTML = "P(X="+x+") = "+b.resultadoBinomialAcumulada(); 
        }
    }else{
        alert("El número de éxitos no debe ser mayor al número de ensayo (n > x ó n = x)");
    } 
}

document.getElementById("n-ensayos").addEventListener("keypress", function(e){
    e.preventDefault();
},false);

document.getElementById("probabilidad").addEventListener("keypress", function(e){
    e.preventDefault();
},false);

document.getElementById("x").addEventListener("keypress", function(e){
    e.preventDefault();
},false);

document.getElementById("b-acumulada").addEventListener("click",agregarDtsBinomial,false);

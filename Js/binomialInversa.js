class BinomialInversa{
    constructor(mu,varianza,a){
        this.mu = mu;
        this.varianza = varianza;
        this.a = a;
    }

    calculoInversa(){
        let x = 0;
        x = (this.a * this.varianza) + this.mu;

        return x;
    }
}



function inversaBinomial(){
    let a = parseFloat(document.getElementById("area").value);
    let mu = parseFloat(document.getElementById("mu").value) ;
    let varianza = parseFloat(document.getElementById("varianza").value);

    let bInversa = new BinomialInversa(mu,varianza,a);

    alert(bInversa.calculoInversa());

}



document.getElementById("btn-inversa").addEventListener("click",inversaBinomial,false);
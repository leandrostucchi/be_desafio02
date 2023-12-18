const analiza = true;
const debuguear = (analiza,leyenda) => { if (analiza) {console.log(leyenda) }}


class productManager{
    static id = 0;        

    constructor (){
        this.products= [];
    }

    getExisteCodigo(code){
        return this.products.some(x=> x.code === code);
    }

    validarDatos(tittle,description,price,thumbnail,code,stock){
        let mensajes = this.controlDatos(tittle,"String");
        mensajes += this.controlDatos(description,"String");
        mensajes += this.controlDatos(price,"Number");
        mensajes += this.controlDatos(thumbnail,"String");
        mensajes += this.controlDatos(code,"String");
        mensajes += this.controlDatos(stock,"Number");
        return mensajes;
    }

    controlDatos(variable,tipo) {
        //? controla cada campo que este cargado
        if (variable === null || variable === undefined || variable === '') {
            return "No ingreso dato \n";
        }
        switch (tipo) {
            case "String":
                if(variable.length<3) return "Debe ser mayor a 3 digitos\n";
                break;
            case "Number":
                if(!this.EsNumerico(variable))  return "No Es un numero\n";
                break;
            default:
                break;
        }
        return '';
    }

    EsNumerico(numero){
        let valor = parseInt(numero);
        if(typeof(valor) != "number"){
            return false;
        }
        return true;
    }



    addProduct(tittle,description,price,thumbnail,code,stock){
        let mensaje = this.validarDatos(tittle,description,price,thumbnail,code,stock);
        if(mensaje == ''){
            if (!this.getExisteCodigo(code)) {
                productManager.id++;
                this.products.push({tittle,description,price,thumbnail,code,stock,id: productManager.id})
            }else{
                console.log(`codigo repetido ${code}`);
            }
        }else{
            console.log(`Mensaje de error: ${mensaje}`);
        }
    }

    getProductById(id){
        return this.products.some(x=> x.id === id) ? this.products.find(x=> x.id === id) : `Id Not Found ${id}` ;
    }
}






let productoNuevo = new productManager();
debuguear(analiza,productoNuevo);
// productoNuevo.addProduct('producto prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',25);
// productoNuevo.addProduct('producto prueba2','Este es un producto prueba2',200,'Sin imagen2','abc124',25);
 productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc123',25);
//productoNuevo.addProduct('3','Este es un producto prueba3',0,'Sin3','abc121',0);
debuguear(analiza,productoNuevo);
// debuguear(analiza,productoNuevo.getProductById(1));
// debuguear(analiza,productoNuevo.getProductById(3));
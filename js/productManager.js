const analiza = true;
const debuguear = (analiza,leyenda) => { if (analiza) {console.log(leyenda) }}

import { promises as fs } from "fs";

class productManager{
    static id = 0;        

    constructor (){
        this.path = './archivo.txt';
        this.products= [];
    }

    validarDatos(tittle,description,price,thumbnail,code,stock){
        let mensajes = this.controlDatos(tittle,"String");
        mensajes += this.controlDatos(description,"String");
        mensajes += this.controlDatos(price,"Number");
        mensajes += this.controlDatos(thumbnail,"String");
        mensajes += this.controlDatos(code,"String");
        mensajes += this.controlDatos(stock,"Number");
        mensajes += this.getExisteCodigo(code);
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
            productManager.id++;
            this.products.push({tittle,description,price,thumbnail,code,stock,id: productManager.id});
            this.addFile(this.path,this.products,'Se inserto el registro');
        }else{
            console.log(`Mensaje de error: ${mensaje}`);
        }
    }

    borrarArchivo = async() => {
        await fs.unlink(this.path);
    }

    updProduct(tittle,description,price,thumbnail,code,stock,id,productos){
        let productsOld =productos;
        let productsNew = [];
        let mensaje = this.validarDatos(tittle,description,price,thumbnail,code,stock);
         if(mensaje == ''){
            productsOld.push({tittle,description,price,thumbnail,code,stock,id});
            for (let index = 0; index < productsOld.length; index++) {
                productsNew.push(productsOld[index])
             }
             this.addFile(this.path,productsNew,'Se actualizo el registro');             
        }
    }


    readProducts = async()=>{
        let resultado = await fs.readFile(this.path,"utf-8");            
        return JSON.parse(resultado);
    }

    getProducts = async ()=> {
       let productos = await this.readProducts();
       console.log(productos);
    }

    readProductByID= async(id) => {
        let producto =  await this.readProducts();
        return producto.some(x=> x.id === id) ?  producto.find(x=> x.id === id) : `Id Not Found ${id}`;
    }

    getExisteCodigo= (code) => {
        let producto = this.products;
        return producto.some(x=> x.code === code) ? `codigo repetido ${code}` : '';
    }

    readProductWhitOutID= async(id) => {
        let producto =  await this.readProducts();
        return producto.filter(x=> x.id !== id);
    }

    getProductById = async(id) => {
        let producto =  await this.readProductByID(id);
        console.log(producto);
    }

    addFile = async (archivo,registro,mensaje)=>{
        let log =JSON.stringify(registro);
        await fs.writeFile(archivo, log)
            .then(() => console.log(`${mensaje}`))
            .catch((err) => console.log(err))
    }

    // updFile = async (archivo,registro,mensaje)=>{
    //     let log =JSON.stringify(registro);
    //     await fs.appendFile(archivo, log)
    //         .then(() => console.log(`${mensaje}`))
    //         .catch((err) => console.log(err))
    // }


    deleteProduct = async(id) =>{
        let producto =  await this.readProductWhitOutID(id);
        if(producto) this.addFile(this.path,producto, `Elimino Id ${id}`);
    }

    updateProduct = async(tittle,description,price,thumbnail,code,stock,id) =>{        
        this.deleteProduct(id);
        let productos =  await this.readProducts();
        await this.updProduct(tittle,description,price,thumbnail,code,stock,id,productos);
     }

}



let productoNuevo = new productManager();
//productoNuevo.borrarArchivo();

// productoNuevo.addProduct('producto prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',25);
// productoNuevo.addProduct('producto prueba2','Este es un producto prueba2',200,'Sin imagen2','abc124',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc121',25);
// productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc123',25);

// productoNuevo.getProducts();

// productoNuevo.getProductById(1);
// productoNuevo.getProductById(5);

//productoNuevo.deleteProduct(3);


productoNuevo.updateProduct('producto prueba2','Este es un producto prueba2',400,'Sin','abc124',25,2);

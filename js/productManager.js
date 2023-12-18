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

    addProduct(tittle,description,price,thumbnail,code,stock){
        if (!this.getExisteCodigo(code)) {
            productManager.id++;
            this.products.push({tittle,description,price,thumbnail,code,stock,id: productManager.id})
        }else{
            console.log(`codigo repetido ${code}`);
        }
    }

    getProductById(id){
        return this.products.some(x=> x.id === id) ? this.products.find(x=> x.id === id) : `Id Not Found ${id}` ;
    }
}





let productoNuevo = new productManager();
debuguear(analiza,productoNuevo);
productoNuevo.addProduct('producto prueba1','Este es un producto prueba1',200,'Sin imagen1','abc123',25);
productoNuevo.addProduct('producto prueba2','Este es un producto prueba2',200,'Sin imagen2','abc124',25);
productoNuevo.addProduct('producto prueba3','Este es un producto prueba3',200,'Sin imagen3','abc123',25);
debuguear(analiza,productoNuevo);
debuguear(analiza,productoNuevo.getProductById(1));
debuguear(analiza,productoNuevo.getProductById(3));
    






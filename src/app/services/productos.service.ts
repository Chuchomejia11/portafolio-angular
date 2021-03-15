import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';
//import { rejects } from 'node:assert';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando=true;
  productos: ProductoInterface [] = [];
  productoFiltrado: ProductoInterface[]= [];
  constructor(private http: HttpClient ) {
    
    this.cargarProductos();
   }
   private cargarProductos(){
     return new Promise( ( resolve,  reject )=>{
        this.http.get('https://angular-html-2512d-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: ProductoInterface [])=>{
          this.productos=resp;
          this.cargando=false;
          resolve(this.productos);
          
        });


      });
  }
  public getProducto(id: string){
    return this.http.get(`https://angular-html-2512d-default-rtdb.firebaseio.com/productos/${ id }.json`);

  }
  buscarProducto(termino:string){
    if (this.productos.length === 0){
      //cargar broductos
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      });

    }
    else{
      this.filtrarProductos(termino);

    }
    /*this.productoFiltrado= this.productos.filter(producto =>{
      return true;
    });
    console.log(this.productoFiltrado);*/

  }
  private filtrarProductos(termino: string){
    //console.log(this.productos);
    this.productoFiltrado=[];
    termino=termino.toLowerCase();



    this.productos.forEach(prod =>{
      const tituloLower= prod.titulo.toLowerCase();
      if(prod.categoria.indexOf(termino )>=0 || tituloLower.indexOf(termino)>=0 ){
        this.productoFiltrado.push(prod)
      }
    })

  }
}

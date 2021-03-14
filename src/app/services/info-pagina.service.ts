import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina, InfoEquipo } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina={};
  cargada = false;

  equipo: any[]=[];

  constructor(private http: HttpClient) {
    //console.log('Servicio de pagina  cargadO');
    this.cargarInfo();
    this.cargarEquipo();

  }
  private cargarInfo() {
      //leer el archivo Json
    this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {
    this.cargada= true;
    this.info= resp;
    });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-2512d-default-rtdb.firebaseio.com/equipo.json').subscribe((resp:any[]) => {
 
      this.equipo= resp;
      console.log(resp)
      }); 
  }
}
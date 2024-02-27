import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-boton',
    templateUrl: './boton.component.html',
    styleUrls: ['./boton.component.css']
})
export class BotonComponent {

    constructor(private http: HttpClient) { }

    ejecutarEvento() {
        const producto = {
            name: 'Nombre del Producto',
            description: 'Descripción del Producto',
            price: 100 // Precio del Producto
        };

        this.http.post<any>('http://localhost:3000/productos', producto).subscribe(
            response => {
                console.log('Producto creado exitosamente', response);
            },
            error => {
                console.error('Error al crear el producto:', error);
            }
        );
    }
}

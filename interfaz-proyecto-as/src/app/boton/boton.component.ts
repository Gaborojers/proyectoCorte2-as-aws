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
            name: 'Coca-Cola',
            description: 'Refresco',
            price: 220 // Precio del Producto
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

import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message: string = '';

  constructor(private websocketService: WebsocketService) {
    this.websocketService.connect().subscribe(
      (data) => {
        try {
          if (typeof data === 'string') {
            this.message = data;
          } else {
            // Si el mensaje es un objeto, intenta extraer la propiedad 'message'
            this.message = data.message || JSON.stringify(data);
          }
        } catch (error) {
          this.message=data;
        }
      },
      (error) => {
        console.error('Error en la conexión WebSocket:', error);
      }
    );
  }
}


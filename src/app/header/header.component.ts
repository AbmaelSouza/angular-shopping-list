import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
@Output() routeEvent = new EventEmitter<string>();
@Input() route:string;
routeEventTrigger(route:string){
  this.routeEvent.emit(route);
}
}
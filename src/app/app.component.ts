import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'course-basics-project';
  routes: string[] =
    ['recipes', 
    'shopping-list'
  ];
  route = 'recipes';
  validateRoute(route: string) {
    return this.routes.includes(route);
  }
  onRouting(route: string) {
    if (this.validateRoute(route)) {
      this.route = route;
      return
    }
    throw console.error(`route '${route}' does not exist on routes array, please add it`);
  }
}

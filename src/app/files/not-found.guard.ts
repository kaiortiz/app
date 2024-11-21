import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NotFoundGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(): boolean {
        //redirige siempre a página 404
        this.router.navigate(['/error']);
        return false; //bloquea navegación original
    }
}
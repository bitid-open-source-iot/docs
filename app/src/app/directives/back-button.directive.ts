import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[back-button]'
})

export class BackButtonDirective {

    constructor(private router: Router, private element: ElementRef, private location: Location) {
        this.element.nativeElement.onclick = (event) => {
            let path = window.location.pathname.split('/');
            if (path.length > 1) {
                path.splice(path.length - 1, 1);
                this.router.navigate(path);
            };
        };
    };

}
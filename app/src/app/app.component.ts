import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { OnInit, Component } from '@angular/core';

@Component({
    selector:       'app-root',
    styleUrls:      ['./app.component.scss'],
    templateUrl:    './app.component.html'
})

export class AppComponent implements OnInit {

    constructor(private registry: MatIconRegistry, private sanitizer: DomSanitizer) {
        this.registry.addSvgIcon('github', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/github.svg'));
        this.registry.addSvgIcon('facebook', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/facebook.svg'));
        this.registry.addSvgIcon('instagram', this.sanitizer.bypassSecurityTrustResourceUrl('./assets/instagram.svg'));
    };

    ngOnInit() {};

}
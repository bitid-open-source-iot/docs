import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-signin',
    styleUrls:      ['./signin.component.scss'],
    templateUrl:    './signin.component.html'
})

export class SigninComponent implements OnInit {

    constructor(private router: Router, private service: AuthService, private formerror: FormErrorService) {};

    public form:    FormGroup = new FormGroup({
        'email':    new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required])
    });
    public errors: any = {
        'email':    '',
        'password': ''
    };
    public loading: boolean;

    public async submit() {
        this.loading = true;

        this.form.disable();

        const response = await this.service.login({
            'email':    this.form.value.email,
            'password': this.form.value.password
        });

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            let returnTo = decodeURIComponent(window.location.search).replace("?returnTo=", "");
            if (typeof(returnTo) == "undefined") {
                returnTo = "/";
            };
            this.router.navigate([returnTo], {
                'replaceUrl': true
            });
        } else {
            
        };
    };

    ngOnInit() {
        this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);    
        });
    };

}
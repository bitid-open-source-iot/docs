import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-signup',
    styleUrls:      ['./signup.component.scss'],
    templateUrl:    './signup.component.html'
})

export class SignupComponent implements OnInit {

    constructor(private router: Router, private service: AuthService, private formerror: FormErrorService) {};

    public form:    FormGroup = new FormGroup({
        'email':    new FormControl('', [Validators.required, Validators.email]),
        'confirm':  new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required])
    });
    public errors: any = {
        'email':    '',
        'confirm':  '',
        'password': ''
    };
    public loading: boolean;

    public async submit() {
        this.loading = true;

        this.form.disable();

        const response = await this.service.register({
            'email':    this.form.value.email,
            'password': this.form.value.password
        });

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/verify-account']);
        } else {
            
        };
    };

    ngOnInit() {
        this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);    
        });
    };

}
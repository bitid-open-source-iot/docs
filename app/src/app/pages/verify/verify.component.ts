import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-verify',
    styleUrls:      ['./verify.component.scss'],
    templateUrl:    './verify.component.html'
})

export class VerifyComponent implements OnInit {

    constructor(private router: Router, private service: AuthService, private formerror: FormErrorService, private localstorage: LocalstorageService) {};

    public form:    FormGroup = new FormGroup({
        'code':     new FormControl('', [Validators.required]),
        'email':    new FormControl(this.localstorage.get('email'), [Validators.required, Validators.email])
    });
    public errors: any = {
        'code':     '',
        'email':    ''
    };
    public loading: boolean;

    public async submit() {
        this.loading = true;

        this.form.disable();

        const response = await this.service.verify({
            'code':     this.form.value.code,
            'email':    this.form.value.email
        });

        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/signin'], {
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
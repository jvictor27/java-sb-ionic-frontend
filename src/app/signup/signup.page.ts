import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    signupForm: FormGroup;
    estados: Array<{ id: string, nome: string }>;
    cidades: Array<{ id: string, nome: string }>;

    constructor(
        public formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        
        this.signupForm = this.formBuilder.group({
            nome:         ['Joaquim',           [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
            email:        ['joaquim@gmail.com', [Validators.required, Validators.email]],
            tipo :        ['1',                 [Validators.required]],
            cpfCnpj :   ['06134596280',       [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
            senha :       ['123',               [Validators.required]],
            logradouro :  ['Rua Via',           [Validators.required]],
            numero :      ['25',                [Validators.required]],
            complemento : ['Apto 3',            []],
            bairro :      ['Copacabana',        []],
            cep :         ['10828333',          [Validators.required]],
            telefone1 :   ['977261827',         [Validators.required]],
            telefone2 :   ['',                  []],
            telefone3 :   ['',                  []],
            estadoId :    [null,                [Validators.required]],
            cidadeId :    [null,                [Validators.required]]
          });
    }

    signupUser() { }

    updateCidades() { }

}
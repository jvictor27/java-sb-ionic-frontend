import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ClienteService } from './../_services/cliente.service';
import { PedidoDTO } from '../_models/pedido-dto';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.page.html',
    styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
    
    pedido: PedidoDTO;
    parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    paymentForm: FormGroup;
    
    constructor(
        private clienteService: ClienteService,
        private navCtrl: NavController,
        private formBuilder: FormBuilder) 
    {
        this.pedido = this.clienteService.getPedidoParaFinalizar();
    }
        
    ngOnInit() {
        this.paymentForm = this.formBuilder.group({
            numeroDeParcelas: [1, Validators.required],
            '@type'         : ['pagamentoComCartao', Validators.required]
        });
    }
    
    nextPage() {
        this.pedido.pagamento = this.paymentForm.value;
        this.clienteService.setPedidoParaFinalizar(this.pedido);
        this.navCtrl.navigateForward(['/order-confirmation']);
    }
        
}
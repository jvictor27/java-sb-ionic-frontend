import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { PedidoDTO } from './../_models/pedido-dto';
import { EnderecoDto } from './../_models/endereco-dto';
import { CartService } from './../_services/cart.service';
import { ClienteService } from './../_services/cliente.service';
import { ParamService } from './../_services/param.service';
import { StorageService } from '../_services/storage.service';

@Component({
    selector: 'app-pick-address',
    templateUrl: './pick-address.page.html',
    styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {
    
    items: EnderecoDto[];
    
    pedido: PedidoDTO;
    
    constructor(
        private navCtrl: NavController,
        private storage: StorageService,
        private clienteService: ClienteService,
        private carService: CartService
        ) { }
        
        ngOnInit() {
            const localUser = this.storage.getLocalUser();
            if (localUser && localUser.email) {
                this.clienteService.findByEmail(localUser.email)
                .subscribe(response => {
                    this.items = response['enderecos'];
                    const cart = this.carService.getCart();
                    
                    this.pedido = {
                        cliente:  {id: response['id']},
                        enderecoDeEntrega: null,
                        pagamento: null,
                        itens: cart.items.map(x => {return {
                            quantidade: x.quantidade, produto: {id: x.produto.id}};
                        })
                    };
                },
                error => {
                    if (error.status === 403) {
                        this.navCtrl.navigateRoot('/home');
                    }
                });
            } else {
                this.navCtrl.navigateRoot('/home');
            }
        }
        
        nextPage(address: EnderecoDto) {
            this.pedido.enderecoDeEntrega = {id: address.id};
            // console.log(this.pedido);

            this.clienteService.setPedidoParaFinalizar(this.pedido);
            this.navCtrl.navigateForward(['/payment']);
        }
        
    }
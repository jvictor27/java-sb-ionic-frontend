import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { CartItem } from '../_models/cart-item';
import { EnderecoDto } from './../_models/endereco-dto';
import { ClienteDto } from './../_models/cliente-dto';
import { PedidoDTO } from '../_models/pedido-dto';
import { CartService } from '../_services/cart.service';
import { ClienteService } from './../_services/cliente.service';
import { PedidoService } from '../_services/pedido.service';

@Component({
    selector: 'app-order-confirmation',
    templateUrl: './order-confirmation.page.html',
    styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {
    
    pedido: PedidoDTO;
    cartItems: CartItem[];
    cliente: ClienteDto;
    endereco: EnderecoDto;
    
    codpedido: string;
    
    constructor(
        private clienteService: ClienteService,
        private cartService: CartService,
        private navCtrl: NavController,
        private pedidoService: PedidoService
        )
    {
        this.pedido = this.clienteService.getPedidoParaFinalizar();
    }
    
    ngOnInit() {
        this.cartItems = this.cartService.getCart().items;
        
        this.clienteService.findById(this.pedido.cliente.id)
        .subscribe(response => {
            this.cliente = response as ClienteDto;
            this.endereco  = (response['enderecos'] as EnderecoDto[]).filter(x => x.id === this.pedido.enderecoDeEntrega.id)[0];
        },
        erro => {
            return false;
            this.navCtrl.navigateRoot(['/home']);
        });
    }
    
    total() {
        return this.cartService.total();
    }
    
    checkout() {
        this.pedidoService.insert(this.pedido)
        .subscribe(response => {
            this.cartService.createOrClearCartInLocalStorage();
            this.codpedido = this.extractId(response.headers.get('location'));
        },
        error => {
          if (error.status === 403) {
            this.navCtrl.navigateRoot(['/home']);
          }
        });
    }

    private extractId(location: string): string {
        const position = location.lastIndexOf('/');
        return location.substring(position + 1, location.length);
    }
    
    
    categorias() {
        this.navCtrl.navigateRoot(['/categorias']);
    }
    
    back() {
        this.navCtrl.navigateRoot(['/cart']);
    }
        
}
    
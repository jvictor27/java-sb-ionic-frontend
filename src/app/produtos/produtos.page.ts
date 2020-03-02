import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ProdutoDto } from '../_models/produto-dto';
import { ProdutoService } from '../_services/produto.service';
import { BucketService } from '../_services/bucket.service';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.page.html',
    styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

    items: ProdutoDto[];
    bucketUrl: string;

    constructor(
        public produtoService: ProdutoService,
        private buckutService: BucketService,
        private route: ActivatedRoute,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.bucketUrl = environment.bucketBaseUrl;

        this.route.paramMap.subscribe(
            (params: ParamMap) => {
                console.log(params);
                this.produtoService.findByCategoria(params.get('categoria_id'))
                    .pipe(
                        tap(produto => {
                            const produtos: ProdutoDto[] = produto['content']
                            for (let index = 0; index < produtos.length; index++) {
                                produtos[index] = this.buckutService.loadSmallImageProdutoUrl(produtos[index]);
                            }
                        })
                    ).subscribe(response => {
                        this.items = response['content'];
                    },
                        error => { });
            }
        );
    }

    showDetail(produto_id) {
        this.navCtrl.navigateForward(['/produto-detail', {produto_id: produto_id}]);
    }
}
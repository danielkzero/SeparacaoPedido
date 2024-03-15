<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <ion-modal :is-open="abrirBuscarPedido">
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Buscar pedido
                </ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="setClose(false)">
                        Fechar
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list :inset="true">
                <ion-item color="light">
                    <ion-input 
                        label="Código do pedido" 
                        label-placement="stacked" 
                        ref="codigoPedido" 
                        type="text"
                        placeholder="99999..."
                        v-model="NumeroPedido"
                        @keyup.enter="buscarPedido()">                        
                    </ion-input>
                </ion-item>
                <ion-button expand="block" color="primary" @click="buscarPedido()">
                    PROCURAR
                </ion-button>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Cliente:</strong>
                        {{ Separacao?.NmCliente }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Total:</strong> 
                        {{ somatorioTotalLiquido() }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Peso:</strong> 
                        {{ somatorioTotalPeso() }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Cubagem:</strong> 
                        {{ somatorioTotalCubagem() }}
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Volume:</strong> 
                        {{ somatorioTotalVolume() }}
                    </ion-label>
                </ion-item>
                <ion-button expand="block" color="primary" @click="setAbrirBuscarPedido(false)">
                    SELECIONAR CLIENTE
                </ion-button>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>
<script lang="ts">
import { IonModal, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonInput, IonItem, IonLabel, IonList, IonContent } from "@ionic/vue";
import axios from "axios";
import { defineComponent } from "vue";
import { CabecalhoItem } from '../interface/SeparacaoItem';
import { formatBRL, formatNumero } from '../provider/function';
export default defineComponent({
    components: {
        IonModal, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonInput, IonItem, IonLabel, IonList, IonContent
    },
    props: {
        abrirBuscarPedido: false as any
    },
    data() {
        return {
            NumeroPedido: '' as string,
            Separacao: {} as CabecalhoItem | null
        }
    },
    methods: {
        setClose(status: boolean) {
            this.$emit("setAbrirBuscarPedido", status);
        },
        setAbrirBuscarPedido(status: boolean) {
            this.setClose(status);
            this.$emit("setPedidoSeparar", this.Separacao);
            this.Separacao = {} as CabecalhoItem | null;
            this.NumeroPedido = '';
        },
        async buscarPedido() {
            if (this.NumeroPedido != '') {
                const response = await axios.get('http://191.168.0.12/api/app_separacao/'+this.NumeroPedido);
                if (response.status == 200) {
                    this.Separacao = response.data;
                }
            }
        },
        somatorioTotalLiquido() {
            let total = 0;
            
            if (this.Separacao != null) {
                this.Separacao?.itens?.map((item: any) => {
                    total += parseFloat(item.TotalLiquido);
                });
            }
            return formatBRL(String(total));
        },
        somatorioTotalPeso() {
            let total = 0;
            
            if (this.Separacao != null) {
                this.Separacao?.itens?.map((item: any) => {
                    total += parseFloat(item.Peso);
                });
            }
            return formatNumero(String(total)) + 'kg';
        },
        somatorioTotalCubagem() {
            let total = 0;
            
            if (this.Separacao != null) {
                this.Separacao?.itens?.map((item: any) => {
                    total += parseFloat(item.Cubagem);
                });
            }
            return formatNumero(String(total)) + 'm³';
        },
        somatorioTotalVolume() {
            let total = 0;
            
            if (this.Separacao != null) {
                this.Separacao?.itens?.map((item: any) => {
                    total += parseFloat(item.Volume);
                });
            }
            return formatNumero(String(total));
        }
    },
    async mounted() { 
        /*       
        const response = await axios.get('http://191.168.0.12/api/app_separacao/112587');
        if (response.status == 200) {
            this.Separacao = response.data;
            //console.log(response.data.itens);
            this.$emit("setPedidoSeparar", this.Separacao);
        }
        */
    }
});
</script> 
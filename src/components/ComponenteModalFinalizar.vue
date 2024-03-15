<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <ion-modal :is-open="abrirBuscarUsuario">
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Identificação do operador
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
                        label="Código do usuário" 
                        label-placement="stacked" 
                        ref="codigoUsuario" 
                        type="text"
                        placeholder="99999..."
                        v-model="NumeroUsuario"
                        @keyup="buscarUsuario()">                        
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Usuário:</strong>
                        {{ Usuario?.nome }}
                    </ion-label>
                </ion-item>
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
import { usuarioInterface } from '../interface/Usuario';
export default defineComponent({
    components: {
        IonModal, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonInput, IonItem, IonLabel, IonList, IonContent
    },
    props: {
        abrirBuscarUsuario: false as any
    },
    data() {
        return {
            NumeroUsuario: '' as string,
            Usuario: {} as usuarioInterface | null
        }
    },
    methods: {
        setClose(status: boolean) {
            this.$emit("setAbrirBuscarUsuario", status);
        },
        setAbrirBuscarPedido(status: boolean) {
            this.setClose(status);
            this.$emit("setUsuario", this.Usuario);
            this.Usuario = {} as CabecalhoItem | null;
            this.NumeroUsuario = '';
        },
        async buscarUsuario() {
            if (this.NumeroUsuario != '' && this.NumeroUsuario.length >= 9) {
                const response = await axios.get('http://191.168.0.12/api/app_usuario/'+this.NumeroUsuario);
                if (response.status == 200) {
                    this.Usuario = response.data[0];
                    setTimeout(this.setAbrirBuscarPedido, 1000);
                }
                this.NumeroUsuario = '';
            }
        },
    },
});
</script> 
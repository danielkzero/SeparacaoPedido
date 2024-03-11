<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <ion-modal :is-open="abrirBuscarPedido">
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Buscar pedido
                </ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="setAbrirBuscarPedido(false)">
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
                        placeholder="99999...">
                    </ion-input>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Cliente:</strong>
                        VALEPLAST IND. COM. PLAST. LTDA. LTDA. LTDA. LTDA. LTDA.
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Total:</strong> 
                        R$ 8.502,20
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Peso:</strong> 
                        2,125kg
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Cubagem:</strong> 
                        0,213m³
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label class="ion-text-wrap">
                        <strong>Volume:</strong> 
                        2,6
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
import { defineComponent } from "vue";
export default defineComponent({
    components: {
        IonModal, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonInput, IonItem, IonLabel, IonList, IonContent
    },
    props: {
        abrirBuscarPedido: false as any
    },
    methods: {
        setAbrirBuscarPedido(status: boolean) {
            this.$emit("setAbrirBuscarPedido", status);
        }
    }
});
</script>
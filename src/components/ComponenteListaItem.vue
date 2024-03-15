<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <ion-list :inset="true" class="m-3 p-0 no-shadow">
        <ion-item-sliding v-for="(item, i) in separacaoItem" :key="i" :id="'item_'+i">
            <ion-item :color="setColor(item)">
                <ion-icon class="pe-3" size="large" :icon="qrCodeOutline"></ion-icon>
                <ion-label class="ion-text-wrap">
                    <div class="ion-text-wrap">{{ item.CdChamadaProduto }} - {{ item.descricao }}</div>
                    <ion-badge color="dark">
                        <h2><strong>{{ item.QntConferidaItem }}/{{ item.QntPedidaItem }}</strong></h2>
                    </ion-badge>
                </ion-label>
                <ion-note color="dark" slot="end">
                    <ion-button :id="'info'+item.CdChamadaProduto" :color="setColor(item)">
                        <ion-icon :icon="getIcone(item)"></ion-icon>
                    </ion-button>
                    <ion-popover :trigger="'info'+item.CdChamadaProduto" trigger-action="hover">
                        <ion-content class="ion-padding">{{ getTexto(item) }}</ion-content>
                    </ion-popover>
                </ion-note>                
            </ion-item>
            <ion-item-options>
                <ion-item-option color="danger" style="padding-left: 1.2rem; padding-right: 1.2rem;" @click="removeUmItem(item)">-1</ion-item-option>
            </ion-item-options>
        </ion-item-sliding>
    </ion-list>
</template>
<script lang="ts">
import { checkmarkOutline, qrCodeOutline, alertOutline, warningOutline, skullOutline, ticketOutline } from 'ionicons/icons';
import { IonList, IonItem, IonNote, IonPopover, IonButton, IonIcon, IonBadge, IonLabel, IonContent, IonItemSliding, IonItemOption, IonItemOptions } from "@ionic/vue";
import { defineComponent } from "vue";
import { SeparacaoItem } from '@/interface/SeparacaoItem'; 
export default defineComponent({
    components: {
        IonList, IonItem, IonNote, IonPopover, IonButton, IonIcon, IonBadge, IonLabel, IonContent, IonItemSliding, IonItemOption, IonItemOptions
    },
    setup() {
        return {
            qrCodeOutline, alertOutline, checkmarkOutline, warningOutline, skullOutline, ticketOutline
        }
    },
    props: {
        abrirBuscarPedido: Boolean,
        separacaoItem: Array as () => SeparacaoItem[]
    },
    methods: {
        removeUmItem(item: SeparacaoItem) {
            if (item.QntConferidaItem > 0) {
                item.QntConferidaItem = item.QntConferidaItem - 1;
            }            
        },
        setAbrirBuscarPedido(status: boolean) {
            this.$emit("setAbrirBuscarPedido", status);
        },
        getIcone(item: SeparacaoItem) {
            //============================
            // item totalmente conferido
            //============================
            if (item.QntConferidaItem - item.QntPedidaItem == 0) {
                return checkmarkOutline;
            }
            //============================
            // item excedente
            //============================
            if (item.QntConferidaItem - item.QntPedidaItem > 0) {
                return warningOutline;
            }
            //============================
            // item ainda não foi conferido
            //============================
            if (item.QntConferidaItem == 0) {
                return ticketOutline;
            }
            //============================
            // item em conferência
            //============================
            if (item.QntConferidaItem != item.QntPedidaItem) {
                return alertOutline;
            }
        },
        getTexto(item: SeparacaoItem) {
            //============================
            // item totalmente conferido
            //============================
            if (item.QntConferidaItem - item.QntPedidaItem == 0) {
                return 'Item totalmente conferido';
            }
            //============================
            // item excedente
            //============================
            if (item.QntConferidaItem - item.QntPedidaItem > 0) {
                return 'Item excedeu o pedido';
            }
            //============================
            // item ainda não foi conferido
            //============================
            if (item.QntConferidaItem == 0) {
                return 'Item ainda não foi conferido';
            }
            //============================
            // item em conferência
            //============================
            if (item.QntConferidaItem != item.QntPedidaItem) {
                return 'Item em conferência';
            }
        },
        setColor(item: SeparacaoItem) {
            //============================
            // item totalmente conferido
            //============================
            if (item.QntConferidaItem - item.QntPedidaItem == 0) {
                //this.playOk();
                return 'success';
            }
            //============================
            // item excedente
            //============================
            if (item.QntConferidaItem - item.QntPedidaItem > 0) {
                return 'warning';
            }
            //============================
            // item ainda não foi conferido
            //============================
            if (item.QntConferidaItem == 0) {
                return 'light';
            }
            //============================
            // item em conferência
            //============================
            if (item.QntConferidaItem != item.QntPedidaItem) {
                //this.playCancel();
                return 'danger';
            }
        },
        playCancel() {
            const audioFile = '@/sounds/cancel2.wav'; 
            const audio = new Audio(audioFile);
            audio.play();
        },
        playOk() {
            const audioFile = '@/sounds/ok2.wav'; 
            const audio = new Audio(audioFile);
            audio.play();
        }
    }
});
</script>
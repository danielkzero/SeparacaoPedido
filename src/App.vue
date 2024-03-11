<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-button expand="block" color="secondary" @click="setAbrirBuscarPedido(true)">
                <ion-icon :icon="searchOutline" slot="start"></ion-icon>PEDIDO
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button expand="block" color="dark">
                <ion-icon :icon="flagOutline" slot="start"></ion-icon>FINALIZAR
              </ion-button>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-input
                  label="Código do produto"
                  label-placement="stacked"
                  v-model="CodigoProduto"
                  @keyup.enter="buscaPedido()" 
                  ref="inputCodigoProduto" 
                  placeholder="7898477..." 
                  autofocus></ion-input>
                <ion-icon :icon="barcodeOutline" slot="end"></ion-icon>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
      <ion-toolbar>
        <ion-title>000111 - VALEPLAST IND. COM. PLAST. LTDA LTDA LTDA LTDA LTDA LTDA LTDA LTDA LTDA LTDA LTDA LTDA</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>      
      <ComponenteListaItem :separacaoItem="separacaoItem"></ComponenteListaItem>
      <ComponenteModal :abrirBuscarPedido="abrirBuscarPedido" @setAbrirBuscarPedido="setAbrirBuscarPedido"></ComponenteModal>
    </ion-content>    
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp, IonGrid, IonRow, IonCol, IonItem, IonInput, IonCard, IonContent, IonHeader, IonToolbar,
  IonText, IonLabel, IonList, IonTitle, IonButtons, IonButton, IonIcon, IonNote, IonCardContent,
  IonBadge, IonPopover, IonModal
} from "@ionic/vue";
import { defineComponent } from "vue";
import { SeparacaoItem } from "./interface/SeparacaoItem";
import { barcodeOutline, flagOutline, searchOutline } from 'ionicons/icons';
import ComponenteModal from './components/ComponenteModal.vue';
import ComponenteListaItem from './components/ComponenteListaItem.vue';
export default defineComponent({
  name: "App",
  components: {
    IonApp, IonGrid, IonRow, IonCol, IonItem, IonInput, IonCard, IonContent, IonHeader,
    IonToolbar, IonText, IonLabel, IonList, IonTitle, IonButtons, IonButton, IonIcon,
    IonNote, IonCardContent, ComponenteModal, IonBadge, IonPopover, IonModal, ComponenteListaItem
  },
  data() {
    return {
      BuscandoDados: false,
      ListaSeparacao: [] as SeparacaoItem[],
      CodigoPedido: "",
      CodigoProduto: "",
      abrirBuscarPedido: false,
      separacaoItem: [] as SeparacaoItem[]
    };
  },
  
  setup() {
    return {
      barcodeOutline, flagOutline, searchOutline
    };
  },
  methods: {    
    colorir(pedido: SeparacaoItem) {
      if (pedido.QntConferidaItem == pedido.QntPedidaItem) {
        return 'success';
      }else{
        return 'danger';
      }
    },
    setAbrirBuscarPedido(status: boolean) {
      this.abrirBuscarPedido = status;
    },
  },
});
</script>

<style>
ion-title {
  padding-left: 1rem;
  padding-right: 1rem;
}
.item-inner {
  border-width: 0px;
  border-style: none !important;
}
.pe-3{
  padding-right: 1rem;
}
ion-card.no-shadow {
  box-shadow: none !important;
}
small{
  font-size: 0.7rem;
}
</style>

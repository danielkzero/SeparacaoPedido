<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <ion-app>
    <ion-header id="header">
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
                  @keyup.enter="buscaProduto()" 
                  ref="inputCodigoProduto" 
                  placeholder="7898477..." 
                  autofocus></ion-input>
                <ion-icon :icon="barcodeOutline" slot="end"></ion-icon>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
      <ion-toolbar v-if="separacao?.CdChamadaCliente != undefined">
        <ion-title>{{ separacao?.CdChamadaCliente + ' - ' + separacao?.NmCliente }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <!-- Componente de listagem de itens -->     
      <ComponenteListaItem :separacaoItem="separacaoItem"></ComponenteListaItem>
      <!-- Componente de chamada de modal, para buscar o pedido a ser conferido -->
      <ComponenteModal :abrirBuscarPedido="abrirBuscarPedido" @setAbrirBuscarPedido="setAbrirBuscarPedido" @setPedidoSeparar="setPedidoSeparar"></ComponenteModal>
      <!-- Componente de alertas, para orientar o usuário -->
      <ion-toast
        ref="myToast"
        :message="toastMessage"
        :duration="toastDuration"
        class="custom-toast"
      ></ion-toast>
    </ion-content>    
  </ion-app>
</template>

<script lang="ts">
//Componentes personalizados.
import ComponenteModal from './components/ComponenteModal.vue';
import ComponenteListaItem from './components/ComponenteListaItem.vue';
//Interfaces personalizadas.
import { SeparacaoItem } from "./interface/SeparacaoItem";
import { CabecalhoItem } from './interface/SeparacaoItem';


import { defineComponent } from "vue";
import { barcodeOutline, flagOutline, searchOutline } from 'ionicons/icons';
import {
  IonApp, IonGrid, IonRow, IonCol, IonItem, IonInput, IonCard, IonContent, IonHeader, IonToolbar,
  IonText, IonLabel, IonList, IonTitle, IonButtons, IonButton, IonIcon, IonNote, IonCardContent,
  IonBadge, IonPopover, IonModal, IonToast , toastController 
} from "@ionic/vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp, IonGrid, IonRow, IonCol, IonItem, IonInput, IonCard, IonContent, IonHeader, IonToolbar, 
    IonText, IonLabel, IonList, IonTitle, IonButtons, IonButton, IonIcon, IonNote, IonCardContent, 
    ComponenteModal, IonBadge, IonPopover, IonModal, ComponenteListaItem, IonToast
  },
  data() {
    return {
      CodigoProduto: "",
      abrirBuscarPedido: false,
      separacaoItem: [] as SeparacaoItem[],
      separacao: {} as CabecalhoItem | null,
      toastMessage: 'This is a toast message.',
      toastDuration: 2000, // Duration in milliseconds
      myToast: null as InstanceType<typeof IonToast> | null
    };
  },  
  setup() {
    return {
      barcodeOutline, flagOutline, searchOutline
    };
  },
  methods: {
    async showToast() {
      const toast = await toastController.create({
        message: 'Esse produto não existe na lista.',
        duration: 5000,
        positionAnchor: 'header',
        position: 'top'
      });
      await toast.present();
    },
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
    setPedidoSeparar(Pedido: CabecalhoItem) {
      this.separacaoItem = [];
      this.separacaoItem = Pedido.itens;
      this.separacao = Pedido;

    },
    async buscaProduto() {
      const found = this.separacaoItem.find((element) => element.EAN13 == this.CodigoProduto);
      if (!found) {
        this.showToast();
      }else {
        let total = parseFloat(String(found.QntConferidaItem)) + 1;
        found.QntConferidaItem = total;
      }
      this.CodigoProduto = '';
    },    
  }
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
ion-toast {
    --background: #ff1e00;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
    --color: #ffffff;
  }
</style>

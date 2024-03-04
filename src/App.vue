<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <ion-app>
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-input
                  v-model="chaveAcesso"
                  label="Chave de acesso"
                  label-placement="stacked"
                  @keydown="buscaInfo" 
                  ref="inputchaveAcesso"
                  autofocus
                >
                </ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row class="ion-margin">
          <ion-col class="h5">Total: {{ ListaPedido.length }}</ion-col>
        </ion-row>
        <template v-for="(pedido, i) in ListaPedido" :key="i">
          <ion-card>
            <ion-row class="ion-margin">
              <ion-col size="10" size-lg="10">
                <ion-text color="tertiary" class="h3">{{ pedido.chaveAcesso }}</ion-text>
              </ion-col>
            </ion-row>
          </ion-card>
        </template>
        <template v-for="(item, i) in acoes" :key="i">
          <ion-card>
            <ion-row class="ion-margin">
              <ion-col size="10" size-lg="10">
                <ion-text color="secondary" class="h3">
                  {{ item.mensagem }}
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-card>
        </template>
        <ion-card>
          <ion-row class="ion-margin">
            <ion-col size="10" size-lg="10">
              <ion-text color="danger" class="h3">
                Versão: {{ appVersion }}
              </ion-text>
            </ion-col>
          </ion-row>
        </ion-card>        
      </ion-grid>
    </ion-content>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonCard,
  IonContent,
  IonHeader,
  IonToolbar,
  IonText,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { checkmarkOutline, refreshOutline, closeOutline } from "ionicons/icons";
import axios from "axios";
import moment from "moment";
import {version} from '../package';

export interface ItemPedido {
  chaveAcesso: string;
  enviado: Number;
}

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonCard,
    IonContent,
    IonHeader,
    IonToolbar,
    IonText,
  },
  data() {
    return {
      ListaPedido: [] as ItemPedido[],
      acoes: [],
      chaveAcesso: "",
      lastExecutionTime: Date.now(),
      intervaloVerificacaoInatividadeId: null as ReturnType<typeof setInterval> | null,
      appVersion: version
    };
  },
  setup() {
    return {
      checkmarkOutline,
      closeOutline,
      refreshOutline,
    };
  },
  methods: {
    formatBRL(valor) {
      return parseFloat(valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    },
    formatData(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    adicionarEstoque(novoItem: ItemPedido) {
      this.lastExecutionTime = Date.now();

      const index = this.ListaPedido.findIndex(
        (item) => item.chaveAcesso === novoItem.chaveAcesso
      );
      
      if (index !== -1) {
      } else {
        this.ListaPedido.unshift({
          chaveAcesso: novoItem.chaveAcesso,
          enviado: 0
        });
      }
      localStorage.setItem("ListaPedido", JSON.stringify(this.ListaPedido));
    },
    //BUSCA OS DADOS DIRETO DO SERVIDOR
    async buscarDados() {
      try {
        const response = await axios.get(
          "http://191.168.0.12/api/app_shopee"
        );
        if (response.status === 200) {
          const storedItem = localStorage.getItem("ListaPedido") || '[]';
          const arrayPedidos: ItemPedido[] = JSON.parse(storedItem);
        
          const encontrado = arrayPedidos.find(
            (pedido: ItemPedido) => pedido.enviado == 0
          );          

          if (encontrado == undefined) {
            localStorage.removeItem("ListaPedido");
          }

          this.ListaPedido = response.data;
          localStorage.setItem("ListaPedido", JSON.stringify(response.data));
          this.acoes.unshift({ mensagem : "Recebeu os dados de Pedidos" });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        this.acoes.unshift({ mensagem : "Erro ao buscar dados: " + error });
      }
    },
    async itensLoad() {
      const ListaPedido = localStorage.getItem("ListaPedido");
      
      if (ListaPedido !== null) {
        this.ListaPedido = JSON.parse(ListaPedido);
      } else {
        this.ListaPedido = [];
      }
    },

    async enviarEstoque() {
      try {
        for (const item of this.ListaPedido) {
          if (item.enviado === 0) {
            const response = await axios.post(
              "http://191.168.0.12/api/app_shopee",
              { item }
            );
          }          
        }
        localStorage.setItem("ListaPedido", JSON.stringify(this.ListaPedido));
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    },


    async buscaInfo(event) {
      if (event.key === 'Enter') {
        const qtdchaveAcesso = this.chaveAcesso.length;
        
        if (qtdchaveAcesso >= 44) {
          if (this.chaveAcesso[0] != '3' && this.chaveAcesso[1] != '3') {
            alert('você não está bipando um chave de acesso válida!');
            this.chaveAcesso = "";
          }
          const storedItem = localStorage.getItem("ListaPedido") || '[]';
          const arrayPedidos: ItemPedido[] = JSON.parse(storedItem);
          const pedidoEncontrado = arrayPedidos.find(
            (pedido: ItemPedido) => pedido.chaveAcesso === this.chaveAcesso
          );

          if (pedidoEncontrado === undefined) {
            this.adicionarEstoque({
              chaveAcesso: this.chaveAcesso
            });
          } else {
            console.log(this.chaveAcesso);
            alert("Já se encontra na lista!");
          }
          this.chaveAcesso = "";
        } else {
          alert('você não está bipando um chave de acesso válida!');
          this.chaveAcesso = "";
        }
      }      
    },
    
    verificarTempoInativo() {
      const intervaloId = setInterval(() => {
        const tempoAtual = Date.now();
        const tempoDecorrido = tempoAtual - this.lastExecutionTime;

        if (tempoDecorrido > 5000) {
          if (this.ListaPedido.length > 0) {
            this.enviarEstoque();
          }
        }
      }, 5000);

      return intervaloId;
    },
    beforeUnmount() {
      if (
        this.intervaloVerificacaoInatividadeId !== null &&
        this.intervaloVerificacaoInatividadeId !== undefined
      ) {
        clearInterval(this.intervaloVerificacaoInatividadeId);
      }
    },
  },
  async mounted() {
    localStorage.clear();
    await this.buscarDados();
    await this.itensLoad();

    this.intervaloVerificacaoInatividadeId = this.verificarTempoInativo();

    document.addEventListener("resume", () => {
      this.lastExecutionTime = Date.now();
    });
  },
});
</script>

<style scoped>
.h3 {
  font-size: 1.3rem;
}

.h5 {
  font-size: 1.5rem;
}
</style>

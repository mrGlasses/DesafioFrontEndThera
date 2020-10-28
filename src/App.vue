<template>
  <v-app>
    <v-app-bar 
      app 
      prominent 
      color="grey lighten-5" 
      dense
      light
      absolute
      elevate-on-scroll>
      <v-container>
        <v-row
          class="mb-6"
          no-gutters
          style="height: 20px;"
        >
          <v-layout align-center>
            <div id="logo">
              <v-img
                src="./assets/symbol.svg"
              ></v-img>
            </div>

            <v-divider
              vertical
              inset
              class="py-2"
            ></v-divider>
            
            <div id="modoPesquisa">
              <v-btn-toggle
                v-model="toggle_exclusive"
                mandatory
                class="ml-4"
                light
                bottom  
                color="#D83367"          
              >
                <v-btn>
                  <v-icon medium color="grey">mdi-security</v-icon>
                </v-btn>
                <v-btn>  
                  <v-icon medium color="grey">mdi-account</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>
            <div label="campoPesquisa">
              <v-text-field
                id="textPesquisa"
                label="Pesquisa"
                left
                color="grey"
                bottom
                light
                class="pt-8 mx-8"
                append-icon="mdi-magnify"
              >
              </v-text-field>
            </div>
          </v-layout>

          <v-layout align-center justify-end>
            <div id="botoes_interacao">
              <v-btn 
                color="white" 
                @click.stop="drawer = !drawer">
                <v-icon medium color="grey">mdi-tune</v-icon>
              </v-btn>
              <v-btn 
                light
                color="#D83367"
                class="ml-2 mr-4 white--text">
                <v-icon medium left color="white">mdi-account</v-icon>
                INCLUIR USUÁRIO
              </v-btn>
            </div>

            <v-divider
              vertical
              inset
              class="py-2"
            ></v-divider>

            <div id="essenciais">
              <v-icon class="ml-4 mr-2" medium color="grey">mdi-home</v-icon>
              <v-icon class="ml-2 mr-2" medium color="grey">mdi-cog</v-icon>
              <v-icon class="ml-2" medium color="grey">mdi-power</v-icon>
            </div>
          </v-layout>
        </v-row>
      </v-container>
    </v-app-bar>
    
    <v-content color="grey lighten-4">
      <v-layout class="mt-10" align-center justify-center>
        <div id="tabela">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="pessoas"
            :page.sync="page"
            :single-select=true
            hide-default-footer
            item-key="usuario"
            show-select
            class="elevation-1"
            @page-count="pageCount = $event"
          >
            <template v-slot:item.status="{ item }">
              <spam :style="getColor(item.status)">
                {{ item.status }}
              </spam>
            </template>

            <template v-slot:item.acoes="{ item }">
              <v-icon>
                {{ item.acoes }}
              </v-icon>
            </template>
          </v-data-table>

          <div class="text-center pt-2">
            <v-pagination
              color="#D83367"
              next-aria-label="Próximo"
              previous-aria-label="Anterior"
              v-model="page"
              :length="pageCount"
            ></v-pagination>
          </div>
        </div>
      </v-layout>
    </v-content>

    <v-footer
      absolute
      color="black"
    >
      <v-row>
        <v-col cols=1>
          <v-icon color="orange" class="mr-2">mdi-radiobox-marked</v-icon>
          <span style="color:orange;font-size:15px;font-family:Audiowide">NO AR</span>
        </v-col>
        <v-col cols=2>
          <v-icon color="white" class="mr-2">mdi-television</v-icon>
          <span style="color:white;font-size:14px">ENCONTRO - 10:00</span>
        </v-col>
        <v-col cols=4>
          <v-icon color="white" class="mr-2">mdi-update</v-icon>
          <span style="color:white;font-size:14px;font-family:roboto">Última atualização em {{ new Date().toLocaleString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit'
             }) }}</span>
        </v-col>
        <v-col cols=3>
          <span style="color:grey;font-size:16px;font-family:roboto">            
            {{ new Date().toLocaleString(undefined, {
              weekday: 'long'
            }) }}, 
            {{ new Date().toLocaleString(undefined, {
              dateStyle: 'long'
            }) }}
          </span>
        </v-col>
        <v-col cols=2>
          <span style="color:orange;font-size:31px;font-family:Audiowide"> //
            {{ new Date().toLocaleString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
             }) }}
          </span>
        </v-col>
      </v-row>
    </v-footer>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      right
      temporary
      width="27%"
      color="grey lighten-4"
    >    
      <v-app-bar 
        app 
        prominent 
        color="grey lighten-5" 
        dense
        light
        absolute
        elevate-on-scroll>
        <v-layout align-center class="mt-4">
          <v-row>
            <v-col>
              <v-icon>
                mdi-tune
              </v-icon>
              <span style="color:#333333;font-size:21px;font-family:Audiowide">
                FILTROS
              </span>
            </v-col>
            <v-col>
              <v-layout justify-end>
                <v-btn
                  left
                  color="white" 
                  @click.stop="drawer = !drawer">
                  <v-icon medium color="grey">mdi-close</v-icon>
                </v-btn>
              </v-layout>
            </v-col>
          </v-row>
        </v-layout>
      </v-app-bar>
      <v-content>
        <v-card-text>
          Utilize os filtros abaixo para refinar os resultados da tabela, clique no botão APLICAR para salvar as alterações.
        </v-card-text>
            <v-list nav>
              <v-list-item>
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="justify-self-start" color="grey lighten-4">
                      <v-icon >mdi-calendar</v-icon>
                      <span>TODAS AS DATAS DE INCLUSÃO</span>
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-list-item>
              <v-divider inset class="mr-12"></v-divider>
              <v-list-item>
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="justify-self-start" color="grey lighten-4">
                      <v-icon >mdi-calendar</v-icon>
                      <span>TODAS AS DATAS DE ALTERAÇÃO</span>
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-list-item>
              <v-divider inset class="mr-12"></v-divider>
              <v-list-item>
                <v-expansion-panels flat>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="justify-self-start" color="grey lighten-4">
                      <v-icon >mdi-set-center-right</v-icon>
                      <span>ATIVOS E INATIVOS</span>
                    </v-expansion-panel-header>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-list-item>
              <v-divider inset class="mr-12"></v-divider>
            </v-list>
            <v-layout align-center align-content-space-between justify-center>
              <v-btn
                color="#D83367"
                depressed
                outlined
                large
                center
                class="mt-4"
                height=80
                width="70%"
              >APLICAR</v-btn>
            </v-layout>
      </v-content>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    name: "App",

    data () {
      return {
        drawer: null,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'USUÁRIO',
            align: 'start',
            sortable: false,
            value: 'usuario',
          },
          { text: 'EMAIL', value: 'email' },
          { text: 'DATA DE INCLUSÃO', value: 'dtInc' },
          { text: 'DATA DE ALTERAÇÃO', value: 'dtAlt' },
          { text: 'REGRAS', value: 'regras' },
          { text: 'STATUS', value: 'status' },
          { text: 'AÇÕES', value: 'acoes' },
        ],
        pessoas: [
          {
            usuario: 'ANPINA',
            email: 'antonio.pina@tvglobo',
            dtInc: '28/05/2019',
            dtAlt: '30/05/2019',
            regras: '01',
            status: 'ATIVO',
            acoes: 'mdi-dots-horizontal',
          },
          {
            usuario: 'CCHANG',
            email: 'ciro.chang@tvglobo.com',
            dtInc: '28/05/2019',
            dtAlt: '30/05/2019',
            regras: '01',
            status: 'ATIVO',
            acoes: 'mdi-dots-horizontal',
          },
          {
            usuario: 'TMARCAL',
            email: 'thiago.marcal@tvglobo.com',
            dtInc: '28/05/2019',
            dtAlt: '30/05/2019',
            regras: '01',
            status: 'ATIVO',
            acoes: 'mdi-dots-horizontal',
          },
          {
            usuario: 'ECGIANN',
            email: 'ecgiannotto@tvglobo.com',
            dtInc: '28/05/2019',
            dtAlt: '30/05/2019',
            regras: '01',
            status: 'ATIVO',
            acoes: 'mdi-dots-horizontal',
          },
          {
            usuario: 'YFERNAND',
            email: 'yuri.vasquez@tvglobo.com',
            dtInc: '28/05/2019',
            dtAlt: '30/05/2019',
            regras: '02',
            status: 'ATIVO',
            acoes: 'mdi-dots-horizontal',
          },
          {
            usuario: 'PLACERDA',
            email: 'pedro.soares.lacerda@tvglobo.com',
            dtInc: '28/05/2019',
            dtAlt: '30/05/2019',
            regras: '02',
            status: 'ATIVO',
            acoes: 'mdi-dots-horizontal',
          },
        ],
      }
    },
    methods: {
      getColor (status) {
        if (status=='ATIVO') return 'color:green'
        else return 'color:red'
      },
    },
  };
</script>

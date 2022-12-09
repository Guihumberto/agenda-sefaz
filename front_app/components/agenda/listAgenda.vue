<template>
    <v-card
      class="mt-5 mx-auto"
      min-width="65%"
    >
      <v-toolbar
        color="cyan"
        dark
      >
      <v-expand-x-transition>
          <v-text-field
              class="mt-5"
              dense append-icon="mdi-magnify"
              rounded outlined filled
              autofocus="true"
              v-if="showSearchField"
              v-model="search"
          ></v-text-field>
      </v-expand-x-transition>
        <v-spacer
            v-if="!showSearchField"
        ></v-spacer>
        <v-btn 
            icon
            @click="showSearchField =! showSearchField"
        >
          <v-icon>{{magnifyIcon}}</v-icon>
        </v-btn>
      </v-toolbar>
  
      <v-list three-line>
        <template>
          <v-subheader
          >Contato</v-subheader>
          <v-list-item-group>
            <template v-for="(item, index) in contactList">
              <v-list-item
                @click="contatoRight(item)"
                :key="index"
              >
                <v-list-item-avatar 
                    color="primary"
                >
                  <v-icon dark>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle>
                    {{item.ct}} / {{item.andar}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <div class="my-2">
                        <small>
                          <v-icon x-small>mdi-phone</v-icon>
                          {{item.phone}}
                        </small>  <br>
                        <small>
                          <v-icon x-small>mdi-briefcase-outline</v-icon>
                          {{item.table ? "Mesa":"Próximo"}}
                        </small>
                    </div>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </template>
          </v-list-item-group>
        </template>
      </v-list>
    </v-card>
  </template>

<script>
export default {
  data: () => ({
    showSearchField: false,
    search: null,
    employee: null,
    items: [
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        name: 'Rodrigo Palhano ',
        ct: 'DIVIDA ATIVA',
        gestor: 'FRANCISCO HONÓRIO V. FILHO',
        phone: '3219- 9082',
        subtitle: `<span class="text--primary">SETOR</span> &mdash; Nome do Setor - 1º Andar`,
        andar: 'Térreo',
        mobile: '(98) 4444-5555',
        wtzp: true,
        table:true,
        email: 'joao.junior@sefaz.ma.gov.br'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        name: 'Marcelo Rubim',
        ct: 'CEL–PROFISCO',
        gestor: 'ADRIANA',
        phone: '3219-9173',
        subtitle: `<span class="text--primary">SETOR</span> &mdash; Nome do Setor - 1º Andar`,
        andar: '2º piso',
        mobile: '(98) 4444-5555',
        wtzp: true,
        table:false,
        email: 'joao.junior@sefaz.ma.gov.br'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        name: 'Joaquim',
        ct: 'INFRAESTRUTURA',
        gestor: 'ALAN JORGE PEREIRA PIRES',
        phone: '3219-9081',
        subtitle: `<span class="text--primary">SETOR</span> &mdash; Nome do Setor - 1º Andar`,
        andar: 'Térreo',
        mobile: '(98) 4444-5555',
        wtzp: true,
        table:false,
        email: 'joao.junior@sefaz.ma.gov.br'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        name: 'Silvino',
        ct: 'SIMPLES NACIONAL',
        gestor: 'ALEXANDRE BALBINO',
        phone: '3219- 9082',
        subtitle: `<span class="text--primary">SETOR</span> &mdash; Nome do Setor - 1º Andar`,
        andar: '1º Piso',
        mobile: '(98) 4444-5555',
        wtzp: true,
        table:true,
        email: 'joao.junior@sefaz.ma.gov.br'
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        name: 'Leonardo',
        ct: 'SUBST TRIB',
        gestor: 'ALISSON EMANUEL',
        phone: '3217-4521',
        subtitle: `<span class="text--primary">SETOR</span> &mdash; Nome do Setor - 1º Andar`,
        andar: 'Térreo',
        mobile: '(98) 4444-5555',
        wtzp: false,
        table:true,
        email: 'joao.junior@sefaz.ma.gov.br'
      },
    ],
  }),
  computed:{
    contactList(){
      if(this.showSearchField && this.search){
        let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let exp = new RegExp(search.trim().replace(/[\[\]!'.@><|//\\&*()_+=]/g, ""), "i");
        let filtro = this.items.filter(project => exp.test(project.name.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "") ) || exp.test( project.phone.replace('.', '') ))

        return filtro.length
        ? filtro
        : 99
      } else {
        return this.items
      }
    },
    magnifyIcon(){
        return this.showSearchField
        ? 'mdi-close' 
        : 'mdi-magnify'
    }
  },
  methods:{
    contatoRight(item){
      this.employee = item
      this.$emit('showContactBtn', this.employee)
    }
  }
}
</script>
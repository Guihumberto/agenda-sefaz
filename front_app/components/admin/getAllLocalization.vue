<template>
    <v-card
      class="mx-auto mt-5 py-0"
      color="primary"
      outlined
    >
    <v-text-field
      label="Busca"
      placeholder="Digite um endereço..."
      v-model="search"
      dense outlined
      append-icon="mdi-magnify"
      class="mx-2 mt-5"
      clearable
      solo
    ></v-text-field>
  
      <v-list two-line class="py-0 my-0">
        <v-list-item-group
          v-model="selected"
          :active-class="colorLine"
        >
          <v-slide-x-transition
            group
          >
            <template v-for="(item, index) in listSearch.list">
              <div :key="index">
                <!-- edit mode -->
                <v-list-item  
                  v-if="editMode == item.id"
                >
                  <v-list-item-icon class="pt-3">
                    <v-icon>mdi-circle-edit-outline</v-icon>
                  </v-list-item-icon>
                  <v-form @submit.prevent="modifyList(item)" ref="form">
                    <v-list-item-content>
                      <v-list-item-title class="pt-3">
                       <v-text-field
                       v-model="item.adress"
                       dense outlined
                       autofocus
                       :rules="[rules.required, rules.mincaracter]"
                       ></v-text-field>
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <div class="d-flex">
                        <v-btn
                          outlined
                          type="submit"
                        >Editar</v-btn>
                        <v-btn
                          class="ml-1"
                          text
                          @click="editMode = null"
                        >Cancelar</v-btn>
                      </div>
                    </v-list-item-action>  
                  </v-form>
                </v-list-item>
                <!-- delete mode -->
                <v-list-item v-else-if="deleteMode == item.id">
                  <v-list-item-icon>
                    <v-icon color="error">mdi-alert-circle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="error--text">
                      Tem certeza que deseja apagar o registro <strong>{{item.adress}}</strong>?
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      A operação não poderá ser desfeita.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div class="d-flex">
                      <v-btn
                        outlined
                        color="error"
                        @click="modifyList(item)"
                      >Sim</v-btn>
                      <v-btn
                        class="ml-1"
                        text
                        @click="deleteMode = null"
                      >Cancelar</v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item>
                <!-- show mode -->
                <v-list-item v-else>
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.adress"></v-list-item-title>
                      <v-list-item-subtitle>{{item.city}} - {{item.type}} - {{item.floor}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-item-action-text>Ações</v-list-item-action-text>
                      <div class="d-flex">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              icon
                              @click="edit(item.id)"
                            >
                              <v-icon>mdi-circle-edit-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Editar</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              icon
                              @click="remove(item.id)"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <span>Apagar</span>
                      </v-tooltip>
                      </div>
                    </v-list-item-action>
                  </template>
                </v-list-item>
                <v-divider
                  v-if="index < list.length - 1"
                ></v-divider>
              </div>
            </template>
          </v-slide-x-transition>
        </v-list-item-group>
      </v-list>
      <layoutComponent-pagination :pagination="pagination" :totalPages="listSearch.totalPages" />
    </v-card>
  </template>
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    data: () => ({
      selected: 1,
      editMode:  null,
      deleteMode: null,
      search: null,
      rules:{
          required: (value) => !!value || "Campo obrigatório",
          mincaracter: (v) => (v||'').length >= 5 || "Mínimo de 05 caracteres",
      },
      pagination:{
          page: 1,
          perPage: 10,
      },
    }),
    computed:{
        list(){
            return this.$store.getters.readLocal.sort(this.order)
        },
        listSearch(){
          let list = this.list
          if(this.search){
              this.pageOne()
             //retirar acentuação
             let search = this.search.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                //retirar caracteres especiais
              let exp = new RegExp(search.trim().replace(/[\[\]!'.@><|//\\&*()_+=]/g, ""), "i")
              //fazer o filtro
              let filtro = list.filter(project => exp.test(project.adress.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "") ) )
                list = filtro
          }
  
          let page = this.pagination.page - 1
          let start = page * this.pagination.perPage
          let end = start + this.pagination.perPage
  
          return {
            list: list.slice(start, end),
            totalPages: Math.ceil(list.length/this.pagination.perPage),
          }
        },
        colorLine(){
          let color = 'primary--text'
          if(this.editMode){
            color = 'success--text'
          }
          if(this.deleteMode){
            color = 'pink--text'
          }
          return color
        }
    },
    methods:{
        ...mapActions(['cargaLocal', 'editSetLocal', 'removeLocal']),
        order(a, b){
          return b.id -  a.id
        },
        edit(item){
          this.deleteMode = null
          this.editMode = item
        },
        remove(item){
          this.editMode = null
          this.deleteMode = item
        },
        pageOne(){
          this.pagination.page = 1
        },
        modifyList(item){
          if(this.editMode){
              this.editSetLocal(item)
              this.editMode = null
              this.$store.dispatch("snackbars/setSnackbars", {text:'Registro editado', color:'success'})
          }
          if(this.deleteMode){
            this.removeLocal(item.id)
            this.deleteMode = null
            this.$store.dispatch("snackbars/setSnackbars", {text:'Registro removido', color:'error'})
          }
        }
    },
    created(){
        this.cargaLocal()
    }
  }
  </script>
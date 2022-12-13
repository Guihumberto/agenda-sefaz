<template>
    <v-card
      class="mx-auto mt-5"
      outlined
    >
  
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="pink--text"
        >
          <v-slide-x-transition
            group
          >
            <template v-for="(item, index) in list">
              <v-list-item :key="index + item.phone">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.phone"></v-list-item-title>
                    <v-list-item-subtitle v-text="item"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>Ações</v-list-item-action-text>
                    <div class="d-flex">
                      <v-btn
                        icon
                      >
                        <v-icon>mdi-circle-edit-outline</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider
                v-if="index < list.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-slide-x-transition>
        </v-list-item-group>
      </v-list>
    </v-card>
  </template>
  <script>
  import { mapActions } from 'vuex'

  export default {
    data: () => ({
      selected: 1,
    }),
    computed:{
        list(){
            return this.$store.getters.readPhone.sort(this.order)
        }
    },
    methods:{
        ...mapActions(['cargaPhone']),
        order(a, b){
          return b.id -  a.id
        },
    },
    created(){
        this.cargaPhone()
    }
  }
</script>
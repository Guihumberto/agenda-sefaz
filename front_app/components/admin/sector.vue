<template>
    <div>
        <v-row>
            <v-col col="12" sm="6">
                <v-card outlined>
                    <v-card-title class="py-0">Inserir novo setor</v-card-title>
                    <v-form @submit.prevent="insert" ref="form">
                        <v-card-text class="pb-0">
                                <v-text-field
                                    label="Setor"
                                    placeholder="COTEC-DEV"
                                    outlined dense
                                    v-model.trim="sector"
                                    :rules="[rules.required, rules.mincaracter]"
                                ></v-text-field>
                        </v-card-text>
                        <v-card-actions class="mt-0 pt-0">
                            <v-spacer></v-spacer>
                            <v-btn
                                color="success" 
                                type="submit"
                            >Inserir</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-col>
            <v-col col="12" sm="6">
                <v-card outlined min-height="160">
                    <v-card-text>
                        <small>Qtd. Registro</small><br>
                        <small>Qtd Registros Vinculados</small><br>
                        <small>Qtd Registros Não Vinculados</small><br>
                        <small>última Atualização</small><br>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <small class="ml-1">Total de Registros: {{list.length}}</small> 
    </div>
</template>

<script>
    import { mapActions } from 'vuex';  
    export default {
        data(){
            return{
                sector: null,
                rules:{
                    required: (value) => !!value || "Campo obrigatório",
                    mincaracter: (v) => (v||'').length >= 5 || "Mínimo de 5 caracteres",
                },
            }
        },
        computed:{
            list(){
                return this.$store.getters.readSector
            }
        },
        methods:{
            ...mapActions(['insertSector', 'cargaSector']),
            insert(){
                if(this.$refs.form.validate()){
                    if(!this.Islist(this.sector)){
                        this.insertSector(this.sector);
                        this.sector = null
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro salvo', color:'success'})
                    } else {
                        this.$store.dispatch("snackbars/setSnackbars", {text:'Registro já cadastrado', color:'error'})
                    }
                }
            },
            Islist(sector){
                let find = this.list.filter(x => x.name == sector)
                if(find.length){
                    return true
                } else {
                    return false
                }
            }
        },
        created(){
            this.cargaSector()
        }
    }
</script>

<style scoped>

</style>
export const strict = false

export const state = () => ({
    listAgenda: [],
    listPhone: [],
    listLocalization: [],
    listSector:[]
})

export const getters = {
    readAgenda(state){
        return state.listAgenda
    },
    readPhone(state){
        return state.listPhone
    },
    readLocal(state){
        return state.listLocalization
    },
    readSector(state){
        return state.listSector
    }
}

export const mutations = {
    setQuestions(state, payload){
        state.listAgenda = payload
    },
    setPhone(state, payload){
        state.listPhone = payload
    },
    savePhone(state, payload){
        state.listPhone.push(payload)
    },   
    editPhone(state, payload){
        const x = state.listPhone.map(item => item.id == payload.id ? payload : item)
        state.listPhone = x

    },
    removePhone(state, payload){
        state.listPhone = state.listPhone.filter(x => x.id != payload)
    },
    setLocal(state, payload){
        state.listLocalization = payload
    },
    saveLocal(state, payload){
        state.listLocalization.push(payload)
    },
    editLocal(state, payload){
        const x = state.listLocalization.map(item => item.id == payload.id ? payload : item)
        state.listLocalization = x
    },
    removeLocal(state, payload){
        state.listLocalization = state.listLocalization.filter(x => x.id != payload)
    },
    setSector(state, payload){
        state.listSector = payload
    },
    saveSector(state, payload){
        state.listSector.push(payload)
    },   
    editSector(state, payload){
        const x = state.listPhone.map(item => item.id == payload.id ? payload : item)
        state.listSector = x
    },
    removeSector(state, payload){
        state.listSector = state.listPhone.filter(x => x.id != payload)
    },
}

export const actions = {
    async getAgenda({commit}){
        try {
            await this.$axios.$get('employee').then((response) => {
                commit('setQuestions', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async cargaPhone({commit}){
        try {
            await this.$axios.$get('phone').then((response) => {
                commit('setPhone', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async insertPhone({commit}, phone){
        const data = {
            phone: phone
        }
        try {
            await this.$axios.$post('phone', data).then((response) => {
                commit('savePhone', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async editSetPhone({commit}, phone){
        try {
            await this.$axios.$put(`phone/${phone.id}`, phone).then((response) => {
                commit('editPhone', phone)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async removePhone({commit}, phone){
        const data = {
            phone: phone
        }
        try {
            await this.$axios.$delete(`phone/${phone}`, data).then((response) => {
                commit('removePhone', phone)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async cargaLocal({commit}){
        try {
            await this.$axios.$get('localization').then((response) => {
                commit('setLocal', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async insertLocal({commit}, local){
        try {
            await this.$axios.$post('localization', local).then((response) => {
                commit('saveLocal', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async editSetLocal({commit}, local){
        try {
            await this.$axios.$put(`localization/${local.id}`, local).then((response) => {
                commit('editLocal', local)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async removeLocal({commit}, local){
        const data = {
            id: local
        }
        try {
            await this.$axios.$delete(`localization/${local}`, data).then((response) => {
                commit('removeLocal', local)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async cargaSector({commit}){
        try {
            await this.$axios.$get('sector').then((response) => {
                commit('setSector', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async insertSector({commit}, sector){
        const data = {
            name: sector
        }
        try {
            await this.$axios.$post('sector', data).then((response) => {
                commit('saveSector', response)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async editSetSector({commit}, phone){
        try {
            await this.$axios.$put(`sector/${phone.id}`, phone).then((response) => {
                commit('editSector', phone)
            })
        } catch (error) {
            console.log(error)
        }
    },
    async removeSector({commit}, phone){
        const data = {
            id: phone
        }
        try {
            await this.$axios.$delete(`sector/${phone}`, data).then((response) => {
                commit('removeSector', phone)
            })
        } catch (error) {
            console.log(error)
        }
    },
}
<template>
    <el-form label-width="120px">
        <el-form-item label="Логин:">
            <el-text>{{ username }}</el-text>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="logout">Выход</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import axios from "axios";
import router from "@/router";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            username: "profile/getUsername",
            token: "profile/getToken"
        }),
        ...mapState({
            backendAPIURL: state => state.backend.backendAPIURL
        })
    },
    methods: {
        async logout() {
            try {
                let response = await axios.post(this.backendAPIURL+'/auth/logout/', {}, {
                    headers: {
                        Authorization: `Token ${this.token}`
                    }
                })
                if (response.status === 204) {
                    await router.push({name: 'signin'})
                }
            } catch (e) {
                await router.push({name: 'signin'})
            }
        }
    },
    mounted() {
        if (!this.token) {
            router.push({ path: '/signin' })
        }
    }
}
</script>

<style scoped>

</style>
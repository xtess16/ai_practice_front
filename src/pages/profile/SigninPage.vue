<template>
    <el-form class="form" :model="form" label-width="120px" label-position="top">
        <el-form-item label="Логин">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="Пароль">
            <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="enter__btn" type="primary" @click="enter">Войти</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState({
            backendAPIURL: state => state.backend.backendAPIURL
        }),
    },
    methods: {
        ...mapActions({
            authenticate: 'profile/authenticate'
        }),
        ...mapMutations({
            setIsAuthenticated: "profile/setIsAuthenticated"
        }),
        enter() {
            this.authenticate({username: this.form.username, password: this.form.password})
        }
    },
    mounted() {
        this.setIsAuthenticated(false)
    }
}
</script>

<style scoped>
.form {
    max-width: 400px;
    justify-content: center;
    margin: 30px auto;
}
.enter__btn {
    width: 100%;
    margin-top: 20px;
}
</style>
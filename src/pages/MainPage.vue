<template>
    <div>
        <div class="title">
            <el-text type="primary" class="title__text">{{ title }}</el-text>
        </div>
        <br>
        <span v-for="item in body" :key="item.id" v-html="item.value">
        </span>
        <div v-if="!healthy">Соединение с backend не установлено</div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import axios from "axios";
import router from "@/router";

export default {
    data() {
        return {
            title: '',
            body: []
        }
    },
    methods: {
        async getPage() {
            try {
                const response = await axios.get(
                    this.backendAPIURL + '/wagtail/pages/',
                    {
                        params: {
                            type: 'cms.MainPage',
                            fields: 'title,body'
                        },
                        headers: {
                            Authorization: `Token ${this.token}`
                        }
                    })
                this.title = response.data.items[0].title
                this.body = response.data.items[0].body
            } catch (e) {
                console.log(e)
            }
        },
        ...mapActions({
            updateHealthy: 'backend/updateHealthy'
        })
    },
    computed: {
        ...mapState({
            backendAPIURL: (state) => state.backend.backendAPIURL,
            healthy: (state) => state.backend.healthy,
        }),
        ...mapGetters({
            token: "profile/getToken"
        })
    },
    mounted() {
        if (!this.token) {
            router.push({path: '/signin'})
        }
        this.updateHealthy()
        this.getPage()
    }
};
</script>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 20px;
}
.title__text {
    font-size: 28pt;
}
span >>> * {
    text-align: center;
    font-size: 20pt;
}
</style>

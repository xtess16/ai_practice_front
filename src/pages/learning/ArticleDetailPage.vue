<template>
    <div class="title__wrapper">
        <el-text type="info" class="title">{{ title }}</el-text>
    </div>
    <div class="content__wrapper">
        <span v-for="bodyBlock in body" :key="bodyBlock.id" v-html="bodyBlock.value">
        </span>
    </div>
</template>

<script>

import axios from "axios";
import {mapGetters, mapState} from "vuex";
import {ElLoading} from "element-plus";
import router from "@/router";

export default {
    data() {
        return {
            title: '',
            body: {
                type: Array
            }
        }
    },
    mounted() {
        if (!this.token) {
            router.push({ path: '/signin' })
            return
        }
        this.getArticleDetail()
    },
    methods: {
        async getArticleDetail() {
            let loading = ElLoading.service({
                lock: true,
                text: 'Загрузка статьи',
                background: 'rgba(0, 0, 0, 0)',
            })
            try {
                let response = await axios.get(this.backendAPIURL + '/wagtail/pages/', {
                    params: {
                        id: this.$route.params.id,
                        type: 'cms.ArticlePage',
                        fields: 'title,body'
                    },
                    headers: {
                        Authorization: `Token ${this.token}`
                    }
                })
                console.log(response.data.items[0])
                this.title = response.data.items[0].title
                this.body = response.data.items[0].body
            } catch (e) {
                console.log(e)
            }
            loading.close()
        }

    },
    computed: {
        ...mapGetters({
            token: "profile/getToken"
        }),
        ...mapState({
            backendAPIURL: state => state.backend.backendAPIURL
        })
    }
}
</script>

<style scoped>
.title__wrapper {
    margin: 20px auto;
    text-align: center;
}
.title {
    font-size: 22pt;
}
.content__wrapper {
    margin: 0 150px;
    text-indent: 50px;
}
.content__wrapper:deep(*) {
    font-size: 17pt;
    margin-top: 10px;
}
</style>
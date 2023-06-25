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
        this.getArticleDetail()
    },
    methods: {
        async getArticleDetail() {
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
    font-size: 18pt;
}
</style>
<template>
    <div>
        <div class="title">
            <el-text size="large" type="primary">{{ title }}</el-text>
        </div>
        <br>
        <span v-for="field in body" :key="field.id" v-html="field.value">
        </span>
        <br>
        <article-list :articles="articles"></article-list>
    </div>
</template>

<script>
import ArticleList from "@/components/ArticleList.vue";
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import router from "@/router";

export default {
    data() {
        return {
            title: '',
            body: '',
            mainPageId: null,
            articles: []
        }
    },
    methods: {
        async getPages() {
            try {
                let response = await axios.get(
                    this.backendAPIURL + '/wagtail/pages/',
                    {
                        params: {
                            type: this.pageType,
                            fields: 'title,body'
                        },
                        headers: {
                            Authorization: `Token ${this.token}`
                        }
                    })
                this.title = response.data.items[0].title
                this.body = response.data.items[0].body
                this.mainPageId = response.data.items[0].id
            } catch (e) {
                console.log(e)
            }
            if (!this.mainPageId)
                return
            try {
                let response = await axios.get(
                    this.backendAPIURL + '/wagtail/pages/',
                    {
                        params: {
                            type: 'cms.ArticlePage',
                            fields: 'preview_image,title',
                            child_of: this.mainPageId
                        },
                        headers: {
                            Authorization: `Token ${this.token}`
                        }
                    })
                console.log(response.data)
                this.articles = response.data.items
            } catch (e) {
                console.log(e)
            }
        },
    },
    props: {
        pageType: {
            type: String,
            required: true
        }
    },
    computed: {
        ...mapState({
            backendAPIURL: (state) => state.backend.backendAPIURL,
        }),
        ...mapGetters({
            token: "profile/getToken"
        })
    },
    components: {ArticleList},
    mounted() {
        if (!this.token) {
            router.push({ path: '/signin' })
        }
        this.getPages()
    }
}
</script>

<style scoped>
.title {
    text-align: center;
    margin-top: 20px;
}
</style>
<template>
    <div>
        <div class="title">
            <el-text size="large" type="primary">Тесты</el-text>
        </div>
        <div class="content">
            <test-list :tests="tests"></test-list>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import TestList from "@/components/TestList.vue";
import router from "@/router";

export default {
    components: {TestList},
    data() {
        return {
            tests: [],
            pageType: 'cms.TestPage'
        }
    },
    methods: {
        async getTests() {
            try {
                let response = await axios.get(
                    this.backendAPIURL + '/wagtail/pages/',
                    {
                        params: {
                            type: this.pageType,
                            fields: 'title,body'
                        },
                        headers: {
                            Authorization: `Token ${this.token}`,
                        }
                    })
                console.log(response.data)
                this.tests = response.data.items
            } catch (e) {
                console.log(e)
            }
        },
    },
    computed: {
        ...mapState({
            backendAPIURL: (state) => state.backend.backendAPIURL,
        }),
        ...mapGetters({
            token: "profile/getToken"
        })
    },
    mounted() {
        if (!this.token) {
            router.push({ path: '/signin' })
        }
        this.getTests()
    }
}
</script>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 20px;
}
</style>
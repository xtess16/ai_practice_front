<template>
    <el-card :body-style="{ padding: '0px' }" class="article__card" shadow="hover"
             @click="$router.push({name: 'learning:article-detail', params: {id: article.id}})">
        <el-image :fit="fit" :src="backendURL+article.preview_image.meta.download_url" style="width: 100%"/>
        <div class="article__title">
            <el-text truncated>{{ article.title }}</el-text>
        </div>
    </el-card>
</template>

<script>
import {mapState} from "vuex";

export default {
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState({
            backendURL: (state) => state.backend.backendURL
        })
    }
}
</script>

<style scoped>
.article__card {
    max-width: 100%;
}

.article__card:hover {
    cursor: pointer;
}

.article__title {
    max-height: 30px;

}

.article__title {
    padding: 10px;
    text-align: center
}

</style>
<template>
    <div v-if="articles.length === 0">
        <el-empty description="Список статей пуст" />
    </div>
    <transition-group name="article-list">
        <el-row style="justify-content: left">
            <el-col v-for="article in articles" :key="article.id" :span="8">
                <article-item :article="article" class="article"/>
            </el-col>
        </el-row>
    </transition-group>
</template>

<script>
import ArticleItem from "@/components/ArticleItem.vue";

export default {
    components: {ArticleItem},
    props: {
        articles: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.article {
    margin: 20px
}
</style>
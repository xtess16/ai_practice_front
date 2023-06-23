<template>
    <div v-if="tests.length === 0">
        <el-empty description="Список статей пуст" />
    </div>
    <el-row v-for="test in tests" :key="test.id" style="justify-content: center; margin-bottom: 20px">
        <el-col span="8">
            <options-test-item :test="test"></options-test-item>
        </el-col>
    </el-row>
</template>

<script>
import OptionsTestItem from "@/components/OptionsTestItem.vue";

export default {
    components: {OptionsTestItem},
    data() {

    },
    props: {
        tests: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <el-card class="box-card" shadow="hover" style="width: 500px">
        <template #header>
            <div class="card-header">
                <span>{{ test.title }}</span>
            </div>
        </template>
        <div class="text item">
            <div class="body__blocks"><span v-for="bodyBlock in testBlocks" :key="bodyBlock.id"
                                            v-html="bodyBlock.value"></span></div>
            <div class="">
                <el-divider></el-divider>
                <el-radio-group v-model="pickedRadio" @change="makeChoice" :disabled="isDisabledTest">
                    <template v-for="answerGroup in testAnswers" :key="answerGroup.id">
                        <el-radio style="display: block; width: 50%" v-for="answer in answerGroup.value" :key="answer" :label="answer">
                            {{ answer }}
                        </el-radio>
                    </template>
                </el-radio-group>
            </div>
        </div>
    </el-card>
</template>

<script>
import axios from "axios";
import {mapGetters, mapState} from "vuex";
import {ElNotification} from "element-plus";

export default {
    data() {
        return {
            pickedRadio: null,
            isDisabledTest: false
        }
    },
    props: {
        test: {
            type: Object,
            required: true
        }
    },
    computed: {
        testBlocks() {
            return this.test.body.filter(block => block.type !== 'answers')
        },
        testAnswers() {
            return this.test.body.filter(block => block.type === 'answers')
        },
        ...mapState({
            backendAPIURL: state => state.backend.backendAPIURL
        }),
        ...mapGetters({
            token: "profile/getToken"
        })
    },
    methods: {
        makeChoice(value) {
            this.checkCorrectAnswer(value)
        },
        async checkCorrectAnswer(value) {
            try {
                this.isDisabledTest = true
                let response = await axios.post(this.backendAPIURL + '/check_answer/', {
                    'test_id': this.test.id,
                    'picked_value': value
                }, {
                    headers: {
                        Authorization: `Token ${this.token}`
                    }
                })
                if (response.data["is_correct"])
                    this.showSuccessDialog()
                else
                    this.showErrorDialog()
            } catch (e) {
                console.log(e)
            }
            setTimeout(this.enableTest, 2000)
        },
        showSuccessDialog() {
            ElNotification({
                title: 'Ура!',
                message: 'Верно! Молодец!',
                type: 'success'
            })
        },
        showErrorDialog() {
            ElNotification({
                title: 'Эх(',
                message: 'Ошибся, попробуй снова :(',
                type: 'error'
            })
        },
        enableTest() {
            this.isDisabledTest = false
            this.pickedRadio = null
        }
    }
}
</script>

<style scoped>
.body__blocks {

}
</style>
<template>
    <el-menu :ellipsis="false" active-text-color="#35FBF9" class="navbar__menu"
             mode="horizontal" text-color="#00ddcc">
        <el-menu-item class="navbar__menu__item" index="1" @click="$router.push({name: 'home'})">Главная</el-menu-item>
        <el-sub-menu index="2">
            <template #title>Обучение</template>
<!--            <el-menu-item index="2-1" @click="$router.push({name: 'learning'})">Обработка естественного языка-->
<!--            </el-menu-item>-->
            <el-menu-item index="2-1" @click="$router.push({name: 'learning:big-data'})">Большие данные</el-menu-item>
<!--            <el-menu-item index="2-2">Игровая система</el-menu-item>-->
            <el-menu-item index="2-2" @click="$router.push({name: 'learning:ai-history'})">История развития ИИ</el-menu-item>
            <el-menu-item index="2-3" @click="$router.push({name: 'learning:computer-vision'})">Компьютерное зрение</el-menu-item>
            <el-menu-item index="2-4" @click="$router.push({name: 'learning:machine-learning'})">Машинное обучение</el-menu-item>
<!--            <el-menu-item>Робототехника</el-menu-item>-->
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>Задания</template>
            <el-menu-item index="3-1" @click="$router.push({name: 'test-exercises'})">Тесты</el-menu-item>
        </el-sub-menu>
        <div class="flex-grow"/>
        <el-menu-item class="navbar__menu__item" index="4" @click="$router.push({name: 'profile'})">Профиль
        </el-menu-item>
    </el-menu>
</template>

<script>

export default {}
</script>

<style scoped>
.navbar__menu {
    background-color: #0099ee;
}

.navbar__menu__item {

}

.navbar__menu__item.is-active {
    background-color: #0000 !important;
}

.flex-grow {
    flex-grow: 1
}
</style>
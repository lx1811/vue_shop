<template>
    <el-container class="home-container">
        <el-header>
            <div>

            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        }
    }
}

</script>
<style scoped lang="less">
    .home-container{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #EAEDF1;
    }
</style>
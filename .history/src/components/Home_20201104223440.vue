<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/logo.0ec8d90f.png">
                <span>电商后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                        <!-- <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu> -->
                    </el-submenu>
                </el-menu>
            </el-aside>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        > div{
            height: 100%;
            display: flex;
            align-items: center;
            color: white;
            font-size: 25px;
            img{
                height: 80%;
                margin-right: 10px;
            }
        }
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #EAEDF1;
    }
</style>
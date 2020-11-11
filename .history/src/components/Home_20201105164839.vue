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
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="collapseChange">|||</div>
                <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    unique-opened
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                    default-active="/users"
                    >
                    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconsObj[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="'/'+c_item.path" v-for="c_item in item.children" :key="c_item.id" @click="saveNavState('/'+c_item.path)">
                            <template slot="title">
                               <i class="el-icon-menu"></i>
                                <span>{{c_item.authName}}</span> 
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            menuList:[],
            iconsObj:{
                '125':'iconfont iconvueShop_users',
                '103':'iconfont iconvueShop_jurisdiction',
                '101':'iconfont iconvueShop_commodity',
                '102':'iconfont iconvueShop_order',
                '145':'iconfont iconvueShop_data'
            },
            isCollapse:false
        }
    },
    created(){
        this.getMenuList()
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        async getMenuList(){
            const {data:res} = await this.$http.get("menus")
            console.log(res)
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.menuList = res.data
        },
        collapseChange(){
            this.isCollapse =!this.isCollapse
        },
        saveNavState(activePath){
            
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
        .el-menu{
            border-right: none;
        }
    }
    .el-main{
        background-color: #EAEDF1;
    }
    .iconfont{
        padding-right: 10px;
    }
    .toggle-button{
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        123
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    created(){
        this.getRightsList()
    },
    methods:{
        async getRightsList(){
            const {data:res} = await this.$http.get('rights/list')
            console.log(res)
        }
    }
}

</script>
<style scoped lang="less">
</style>
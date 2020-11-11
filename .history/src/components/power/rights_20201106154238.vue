<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="rightsList">
            <el-table-column type="index"></el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            rightsList:[]
        }
    },
    created(){
        this.getRightsList()
    },
    methods:{
        async getRightsList(){
            const {data:res} = await this.$http.get('rights/list')
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.rightsList = res.data
        }
    }
}

</script>
<style scoped lang="less">
</style>
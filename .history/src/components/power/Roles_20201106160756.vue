<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary">添加角色</el-button>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            roleList:[]
        }
    },
    created(){
        this.getRoleList()
    },
    methods:{
        async getRoleList(){
            const {data:res} = await this.$http.get('role')
            const res
        }
    }
}

</script>
<style scoped lang="less">
</style>
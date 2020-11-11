<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row style="margin-bottom:15px;">
            <el-col>
                <el-button type="primary">添加角色</el-button>
            </el-col>
        </el-row>
        <el-table :data="roleList" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        
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
            const {data:res} = await this.$http.get('roles')
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.roleList = res.data
        }
    }
}

</script>
<style scoped lang="less">
</style>
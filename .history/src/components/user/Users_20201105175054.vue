<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList">
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="username" label="角色"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      userList:[],
      total:0,
      pagenum:0
    }
  },
  created(){
    this.getUserList()
  },
  methods:{
    async getUserList(){
      const {data:res} = await this.$http.get('users',{params:this.queryInfo})
      if(res.meta.status!=200) return this.$message.error(res.meta.msg);
      this.userList = res.data.users
      this.total = res.data.total
      this.pagenum = res.data.pagenum
    }
  }
}

</script>
<style scoped lang="less">
</style>
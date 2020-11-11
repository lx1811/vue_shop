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
          <el-input placeholder="请输入查找账号" class="input-with-select" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" size="mini"></el-button>
            <el-button icon="el-icon-delete" type="danger" size="mini"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button icon="el-icon-setting" type="warning" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible:false
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
      this.queryInfo.pagenum = res.data.pagenum
    },
    handleSizeChange(newSize){
      console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(currentPage){
      this.queryInfo.pagenum = currentPage
      this.getUserList()
    },
    async userStateChange({mg_state,id}){
      console.log(mg_state)
      let {data:res} = await this.$http.put(`users/${id}/state/${mg_state}`)
      if(res.meta.status!=200) return this.$message.error(res.meta.msg);
      this.$message.success(res.meta.msg)
    }
  }
}

</script>
<style scoped lang="less">
</style>
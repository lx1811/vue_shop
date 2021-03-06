<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-bottom:10px;">
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
            <el-button icon="el-icon-edit" type="primary" size="mini" @click="showEditDialog(scope.row)"></el-button>
            <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteUserInfo(scope.row)"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button icon="el-icon-setting" type="warning" size="mini" @click="roleDialogShow(scope.row)"></el-button>
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
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClose"
    >
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input :value="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">修 改</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配角色"
      :visible.sync="roleDialogVisible"
      width="50%"
    >
      <p>当前用户：{{userInfo.username}}</p>
      <p>当前角色：{{userInfo.role_name}}</p>
      <p>
        选择角色：
        <el-select v-model="selectRoleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    var checkEmail = (rule,value,cb)=>{
      const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if(regEmail.test(value)) return cb();
      cb(new Error('输入邮箱不合法！'))
    }
    var checkMobile = (rule,value,cb)=>{
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if(regMobile.test(value)) return cb();
      cb(new Error('输入手机号不合法！'))
    }
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      userList:[],
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      editForm:{},
      addFormRules:{
        username:[
          {required:true,message:'请输入账号',trigger:'blur'},
          {min:3,max:15,message:'用户名长度在3~15个字符之间',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:15,message:'密码长度在6~15个字符之间',trigger:'blur'}
        ],
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {validator:checkEmail,trigger:'blur'}
        ],
        mobile:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {validator:checkMobile,trigger:'blur'}
        ]
      },
      userInfo:{},
      roleList:[],
      selectRoleId:'',
      total:0,
      dialogVisible:false,
      editDialogVisible:false,
      roleDialogVisible:false
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
    },
    addDialogClose(){
      this.$refs.addFormRef.resetFields()
    },
    addUser(){
      this.$refs.addFormRef.validate(async valid=>{
        if(valid){
          console.log(valid)
          const {data:res} = await this.$http.post('users',this.addForm)
          if(res.meta.status!=201){
            this.$message.error(res.meta.msg)
          }else{
            this.dialogVisible = false
            this.$message.success(res.meta.msg)
            this.getUserList()
          }
          
        }else{
          this.$message.error('请正确输入新用户信息')
        }
      })
    },
    async showEditDialog({id}){
      const {data:res} = await this.$http.get(`users/${id}`)
      if(res.meta.status!=200) return this.$message.error(res.meta.msg);
      console.log(res)
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editDialogClose(){
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo(){
      this.$refs.editFormRef.validate(async valid=>{
        if(!valid) return this.$message.error('修改后的用户信息不合法！');
        const {data:res} = await this.$http.put(`users/${this.editForm.id}`,this.editForm)
        if(res.meta.status!=200) return this.$message.error(res.meta.msg);
        this.getUserList()
        this.$message.success(res.meta.msg)
        this.editDialogVisible = false
      })
    },
    deleteUserInfo({id}){
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data:res} = await this.$http.delete(`users/${id}`)
          if(res.meta.status!=200) return this.$message.error(res.meta.msg);
          this.$message.success(res.meta.msg)
          this.getUserList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    async roleDialogShow(userInfo){
      this.userInfo = userInfo
      const {data:res} = await this.$http.get('roles')
      if(res.meta.status!=200) return this.$message.error(res.meta.msg);
      this.roleList = res.data
      console.log(this.roleList)
      this.roleDialogVisible = true
    }
  }
}

</script>
<style scoped lang="less">
</style>
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
                <el-button type="primary" @click="addDialogVisible=true">添加角色</el-button>
            </el-col>
        </el-row>
        <el-table :data="roleList" border stripe>
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editFormShow(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加角色"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addFormClose"
        >
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addForm.roleDesc" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoles">添 加</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="编辑角色"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editFormClose"
        >
            <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="editForm.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editForm.roleDesc" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary">添 加</el-button>
            </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            roleList:[],
            addForm:{
                roleName:'',
                roleDesc:''
            },
            edtiForm:{},
            addFormRules:{
                roleName:[
                    {required:true,message:'请输入角色名称',trigger:'blur'},
                    {min:3,max:15,message:'用户名长度在3~15个字符之间',trigger:'blur'}
                ],
                roleDesc:[
                    {required:false,message:'请输入角色描述',trigger:'blur'},
                ]
            },
            addDialogVisible:false,
            editDialogVisible:false
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
        },
        addFormClose(){
            this.$refs.addFormRef.resetFields()
        },
        editFormClose(){
            this.$refs.editFormRef.resetFields()
        },
        addRoles(){
            this.$refs.addFormRef.validate(async valid =>{
                if(!valid) return this.$message.error('新增角色信息不合法！');
                const {data:res} = await this.$http.post('roles',this.addForm)
                if(res.meta.status!=201) return this.$message(res.meta.msg);
                this.addDialogVisible = false
                this.$message.success(res.meta.msg)
                this.getRoleList()
            })
        },
        async editFormShow({id}){
            const {data:res} = await this.$http.get(`roles/${id}`)
            console.log(res)
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.edtiForm = res.data
            this.editDialogVisible = true
        }
    }
}

</script>
<style scoped lang="less">
</style>
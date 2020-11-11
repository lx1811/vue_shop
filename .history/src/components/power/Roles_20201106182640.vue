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
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row v-for="(item_1,index_1) in scope.row.children" :key="item_1.id" :class="['bdbottom',{'bdtop':index_1==0},'row_center']">
                        <el-col :span="5">
                            <el-tag closable @close="removeRightById(scope.row,item_1)">{{item_1.authName}}</el-tag>
                            <i class="el-icon-caret-right"></i>
                        </el-col>
                        <el-col :span="19">
                            <el-row v-for="(item_2,index_2) in item_1.children" :key="item_2.id" :class="{'bdbottom':index_2!=item_1.children.length-1,'row_center':true}">
                                <el-col :span="6">
                                    <el-tag type="success" closable @close="removeRightById(scope.row,item_2)">{{item_2.authName}}</el-tag>
                                    <i class="el-icon-caret-right"></i>
                                </el-col>
                                <el-col :span="18">
                                    <el-tag type="warning" v-for="(item_3,index_3) in item_2.children" :key="item_3.id" closable @close="removeRightById(scope.row,item_3)">{{item_3.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="角色名称" prop="roleName"></el-table-column>
            <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editFormShow(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoles(scope.row)">删除</el-button>
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
                <el-button type="primary" @click="editRoles">修 改</el-button>
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
            editForm:{},
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
            this.editForm = res.data
            this.editDialogVisible = true
        },
        editRoles(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid) return this.$message.error('修改后的角色信息不合法!');
                const {data:res} = await this.$http.put(`roles/${this.editForm.roleId}`,this.editForm)
                if(res.meta.status!=200) return this.$message.error(res.meta.msg);
                this.editDialogVisible = false
                this.$message.success(res.meta.msg)
                this.getRoleList()
            })
        },
        deleteRoles({id}){
            this.$confirm('此操作将永久删除该角色信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const {data:res} = await this.$http.delete(`roles/${id}`)
                console.log(res)
                if(res.meta.status!=200) return this.$message.error(res.meta.msg);
                this.$message.success(res.meta.msg)
                this.getRoleList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        removeRightById(row,{id:rightId}){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const {data:res} = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
                if(res.meta.status!=200) return this.$message.error(res.meta.msg);
                this.$message.success(res.meta.msg)
                row.children = res.data
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}

</script>
<style scoped lang="less">
    .el-tag{
        margin: 7px;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .bdbottom{
        border-bottom: 1px solid #eee;
    }
    .row_center{
        display: flex;
        align-items: center;
    }
</style>
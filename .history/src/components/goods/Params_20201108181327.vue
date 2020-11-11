<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-alert type="warning" title="注意：只允许为第三级分类设置参数！" show-icon :closable="false"></el-alert>
        <el-row style="margin:15px 0px;">
            <el-col>
                <span>选择商品分类：</span>
                <el-cascader
                    v-model="selectedCateKeys"
                    :options="cateList"
                    :props="{ 
                        expandTrigger: 'hover',
                        value:'cat_id',
                        label:'cat_name',
                        children:'children'
                    }"
                    @change="selectedCateKeysChange"
                >
                </el-cascader>
            </el-col>
        </el-row>
        <el-tabs v-model="tabsActiveName" @tab-click="tabsHandleClick">
            <el-tab-pane label="动态参数" name="many">
                <el-button type="primary" size="mini" :disabled="isBtnDisable" style="margin-bottom:15px;" @click="addDialogShow">添加参数</el-button>
                <el-table :data="paramsData.many" border stripe>
                    <el-table-column type="expand">
                        <template slot-scope="scope">
                            <el-tag type="primary" v-for="(item,index) in attrTags(scope.row.attr_vals)" :key="index" closable style="margin-left:10px;">{{item}}</el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="createTagVisible&&(selectedAttrId==scope.row.attr_id)"
                            v-model="newTagValue"
                            ref="newTagRef"
                            size="small"
                            @keyup.enter.native="handleInputConfirm(scope.row)"
                            @blur="handleInputConfirm(scope.row)"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="openCreateTag(scope.row)">+ New Tag</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" type="primary" size="mini" @click="editDialogShow(scope.row)">修改</el-button>
                            <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteParams(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
                <el-button type="primary" size="mini" :disabled="isBtnDisable" style="margin-bottom:15px;" @click="addDialogShow">添加属性</el-button>
                <el-table :data="paramsData.only" border stripe>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="属性名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button icon="el-icon-edit" type="primary" size="mini" @click="editDialogShow(scope.row)">修改</el-button>
                            <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleteParams(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
            :title="tabsActiveName=='many'?'添加参数':'添加属性'"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClose"
        >
            <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="100px">
                <el-form-item :label="tabsActiveName=='many'?'参数名称':'属性名称'" prop="attr_name">
                    <el-input v-model="addForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addParams">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            :title="tabsActiveName=='many'?'修改参数':'修改属性'"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="eidtDialogClose"
        >
            <el-form :model="editForm" :rules="rules" ref="editFormRef" label-width="100px">
                <el-form-item :label="tabsActiveName=='many'?'新参数名称':'新属性名称'" prop="new_attr_name">
                    <el-input v-model="editForm.new_attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editParams">修 改</el-button>
            </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            cateList:[],
            selectedCateKeys:[],
            tabsActiveName:'many',
            paramsData:{
                only:[],
                many:[]
            },
            addForm:{
                attr_name:''
            },
            editForm:{
                new_attr_name:''
            },
            rules:{
                attr_name:[
                    {required:true,message:'请输入名称',trigger:'blur'},
                    {min:3,max:15,message:'名称长度应该在3~15个字符之间',trigger:'blur'}
                ],
                new_attr_name:[
                    {required:true,message:'请输入名称',trigger:'blur'},
                    {min:3,max:15,message:'名称长度应该在3~15个字符之间',trigger:'blur'}
                ]
            },
            selectParamsId:'',
            selectedAttrId:0,
            newTagValue:'',
            addDialogVisible:false,
            editDialogVisible:false,
            createTagVisible:false
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        async getCateList(){
            const {data:res} = await this.$http.get('categories')
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.cateList = res.data
        },
        selectedCateKeysChange(){
            if(this.selectedCateKeys.length!=3){
                this.$message.error('仅能选择第三级分类！')
                this.selectedCateKeys = []
            }else{
                this.paramsData = {
                    only:[],
                    many:[]
                }
                this.getParamsData()
            }
        },
        tabsHandleClick(){
            this.getParamsData()
        },
        async getParamsData(){
            if(this.selectedCateKeys.length!=3){
                this.$message.error('请选择第三级分类！')
                this.selectedCateKeys = []
            }else{
                const {data:res} = await this.$http.get(`categories/${this.selectedCateKeys[this.selectedCateKeys.length-1]}/attributes`,{
                    params:{
                        sel:this.tabsActiveName
                    }
                }) 
                if(res.meta.status!=200) return this.$message.error(res.meta.msg)
                this.paramsData[this.tabsActiveName] = res.data
            }
             
        },
        addDialogShow(){
            this.addDialogVisible = true
        },
        addDialogClose(){
            this.$refs.addFormRef.resetFields()
        },
        eidtDialogClose(){
            this.$refs.editFormRef.resetFields()
            this.selectParamsId = ''
        },
        addParams(){
            this.$refs.addFormRef.validate(async valid=>{
                if(!valid) return this.$message.error('新名称内容不合法！');
                const {data:res} = await this.$http.post(`categories/${this.selectedCateKeys[this.selectedCateKeys.length-1]}/attributes`,{  
                        attr_name:this.addForm.attr_name,
                        attr_sel:this.tabsActiveName
                })
                if(res.meta.status!=201) return this.$message.error(res.meta.msg);
                this.$message.success(res.meta.msg)
                this.addDialogVisible = false
                this.getParamsData()
            }) 
        },
        editDialogShow({attr_id:id}){
            this.selectParamsId = id
            this.editDialogVisible = true
        },
        editParams(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid) return this.$message.error('修改后的名称不合法！');
                const {data:res} = await this.$http.put(`categories/${this.selectedCateKeys[this.selectedCateKeys.length-1]}/attributes/${this.selectParamsId}`,{
                    attr_sel:this.tabsActiveName,
                    attr_name:this.editForm.new_attr_name
                })
                if(res.meta.status!=200) return this.$message.error(res.meta.msg)
                this.$message.success(res.meta.msg)
                this.getParamsData()
                this.editDialogVisible = false
            })
        },
        deleteParams({attr_id:id}){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const {data:res} = await this.$http.delete(`categories/${this.selectedCateKeys[this.selectedCateKeys.length-1]}/attributes/${id}`)
                if(res.meta.status!=200) return this.$message.error(res.meta.msg)
                this.$message.success(res.meta.msg)
                this.getParamsData()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        attrTags(val){
            return val==''?[]:val.split(' ')
        },
        handleInputConfirm(row){
            if(this.newTagValue.trim().length==0){
                this.$message.error('新增选项不合法')
                this.selectedAttrId = 0
                this.newTagValue = ''
                this.createTagVisible = false
            }else{
                this.selectedAttrId = 0
                this.newTagValue = ''
                this.createTagVisible = false
            }
            
        },
        openCreateTag({attr_id:id}){
            this.selectedAttrId = id
            this.createTagVisible = true
            this.$nextTick(_=>{
                this.$refs.newTagRef.$refs.input.focus()
            })
        }
    },
    computed:{
        isBtnDisable(){
            if(this.selectedCateKeys.length!=3) return true;
            return false
        }
    }
}

</script>
<style scoped lang="less">
    .input-new-tag{
        width: 100px;
        margin-left: 10px;
    }
    .button-new-tag{
        margin-left: 10px;
    }
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row style="margin-bottom:15px;">
            <el-col>
                <el-button type="primary" @click="addCateDialogShow">添加分类</el-button>
            </el-col>
        </el-row>
        <tree-table :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border stripe>
            <template slot="isok" slot-scope="scope">
                <i class="el-icon-success" style="color:lightgreen" v-show="scope.row.cat_deleted"></i>
                <i class="el-icon-error" style="color:red" v-show="!scope.row.cat_deleted"></i>
            </template>
            <template slot="order" slot-scope="scope">
                <el-tag :type="scope.row.cat_level|levelFilter(false)">{{scope.row.cat_level|levelFilter(true)}}</el-tag>
            </template>
            <template slot="oper">
                <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
        </tree-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        <el-dialog
            title="添加分类"
            :visible.sync="addCateDialogVisible"
            width="50%"
            @close="addCateDialogClose"
        >
            <el-form :model="addCateForm" :rules="rules" ref="addCateFormRef" label-width="100px">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="addCateForm.cat_name"></el-input>
                </el-form-item>
                <el-form-item label="父级分类">
                    <el-cascader
                        expand-trigger='hover'
                        v-model="value"
                        :options="parentCateList"
                        :props="{
                            value:'cat_id',
                            label:'cat_name',
                            children:'children'
                        }"
                        clearable
                        @change="parentCateChanged"
                        change-on-select
                    >
                    </el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            queryInfo:{
                type:3,
                pagenum:1,
                pagesize:5
            },
            total:0,
            cateList:[],
            parentCateList:[],
            value:[],
            columns:[{
                label:'分类名称',
                prop:'cat_name'
            },{
                label:'是否有效',
                type:'template',
                template:'isok'
            },{
                label:'排序',
                type:'template',
                template:'order'
            },{
                label:'操作',
                type:'template',
                template:'oper'
            }],
            addCateForm:{
                cat_name:'',
                cat_pid:0,
                cat_level:0
            },
            rules:{
                cat_name:[
                    {required:true,message:'请输入分类名称',trigger:'blur'},
                    {min:3,max:15,message:'分类名称在3~15个字符之间',trigger:'blur'}
                ]
            },
            addCateDialogVisible:false
        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        async getCateList(){
            const {data:res} = await this.$http.get('categories',{params:this.queryInfo})
            if(res.meta.status!=200) return this.$mesaage.error(res.meta.msg);
            this.cateList = res.data.result
            this.total = res.data.total
            console.log(res)
        },
        handleSizeChange(currentSize){
            this.queryInfo.pagesize = currentSize
            this.getCateList()
        },
        handleCurrentChange(currentPage){
            this.queryInfo.pagenum = currentPage
            this.getCateList()
        },
        addCateDialogShow(){
            this.getParentCateList()
        },
        async getParentCateList(){
            const {data:res} = await this.$http.get('categories',{params:{type:2}})
            if(res.meta.status!=200) return this.$mesaage.error(res.meta.msg);
            this.parentCateList = res.data
            this.addCateDialogVisible = true
        },
        parentCateChanged(){
            if(this.value.length>0){
                this.addCateForm.cat_pid = this.value[this.value.length-1]
                this.addCateForm.cat_level = this.value.length
            }else{
                this.addCateForm.cat_pid = 0
                this.addCateForm.cat_level = 0
            }
        },
        addCate(){
            this.$refs.addCateFormRef.validate(async valid=>{
                if(!valid) return this.$message.error('新增商品分类数据不合法！');
            })
        },
        addCateDialogClose(){
            this.$refs.addCateFormRef.resetFields()
            this.value = []
            this.addCateForm.cat_pid = 0
            this.addCateForm.cat_level = 0
        }
    },
    filters:{
        'levelFilter':function(value,type){
            if(value==0){
                return type?'一级':''
            }else if(value==1){
                return type?'二级':'success'
            }else{
                return type?'三级':'warning'
            }
        }
    }
}

</script>
<style scoped lang="less">
</style>
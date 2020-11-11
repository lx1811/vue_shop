<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-alert
            title="添加商品信息"
            type="info"
            show-icon
            center>
        </el-alert>
        <el-steps :space="200" :active="parseInt(activeIndex)" finish-status="success" style="margin:15px 0px;" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-form :model="addForm" :rules="rules" ref="addFormRef" label-width="100px" label-position="top">
            <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClicked">
                <el-tab-pane label="基本信息" name="0">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="addForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="addForm.goods_price" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight">
                        <el-input v-model="addForm.goods_weight" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="addForm.goods_number" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader
                            v-model="addForm.goods_cat"
                            :options="cateList"
                            :props="{ 
                                expandTrigger: 'hover',
                                value:'cat_id',
                                label:'cat_name',
                                children:'children'
                            }"
                            @change="selectedCateChange"></el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="1">
                    <el-form-item v-for="item in manyTabData" :key="item.attr_id" :label="item.attr_name">
                        <el-checkbox-group v-model="item.attr_vals">
                            <el-checkbox :label="c_item" v-for="(c_item,i) in item.attr_vals" :key="i" border></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商属性片" name="2">
                    <el-form-item v-for="(item,index) in onlyTabData" :key="index" :label="item.attr_name">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品图片" name="3">
                    <!-- http://timemeetyou.com:8889/api/private/v1/ -->
                    <el-upload
                        action="http://timemeetyou.com:8889/api/private/v1/upload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        list-type="picture"
                        :headers="headerObj"
                        :on-success="handelSuccess"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
                <el-tab-pane label="商品内容" name="4">
                    <quill-editor v-model="addForm.goods_introduce">

                    </quill-editor>
                    <el-button type="primary" @click="add" style="margin-top:15px;">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <el-dialog
            title="图片预览"
            :visible.sync="previewVisable"
            width="50%"
        >
            <img :src="previewPath" alt="预览图片" style="width:100%;">
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
    data(){
        return {
            activeIndex:'0',
            previewPath:'',
            cateList:[],
            manyTabData:[],
            onlyTabData:[],
            checkList:[],
            headerObj:{
                Authorization:window.sessionStorage.getItem('token')
            },
            addForm:{
                goods_name:'',
                goods_price:0,
                goods_weight:0,
                goods_number:0,
                goods_cat:[],
                pics:[],
                goods_introduce:'',
                attrs:[]
            },
            rules:{
                goods_name:[
                    {required:true,message:'请输入商品名称',trigger:'blur'}
                ],
                goods_price:[
                    {required:true,message:'请输入商品价格',trigger:'blur'}
                ],
                goods_weight:[
                    {required:true,message:'请输入商品重量',trigger:'blur'}
                ],
                goods_number:[
                   {required:true,message:'请输入商品数量',trigger:'blur'} 
                ],
                goods_cat:[
                    {required:true,message:'请选择商品分类',trigger:'blur'} 
                ]
            },
            previewVisable:false
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
        selectedCateChange(e){
            if(this.addForm.goods_cat.length!=3){
                this.$message.error('只允许选择第三级分类')
                this.addForm.goods_cat = []
            }
        },
        beforeTabLeave(active,old){
            if(old==0&&this.addForm.goods_cat.length!=3){
                this.$message.error('请选择商品分类')
                return false
            }
        },
        async tabClicked(){
            if(this.activeIndex==1){
                const {data:res} = await this.$http.get(`categories/${this.addForm.goods_cat[2]}/attributes`,{
                    params:{
                        sel:'many'
                    }
                })
                if(res.meta.status!=200) return this.$message.error(res.meta.msg);
                res.data.forEach(item=>{
                    item.attr_vals = item.attr_vals==''?[]:item.attr_vals.split(' ')
                    return item
                })
                this.manyTabData = res.data
            }else if(this.activeIndex==2){
                const {data:res} = await this.$http.get(`categories/${this.addForm.goods_cat[2]}/attributes`,{
                    params:{
                        sel:'only'
                    }
                })
                if(res.meta.status!=200) return this.$message.error(res.meta.msg);
                this.onlyTabData = res.data
            }
        },
        handlePreview(file){
            console.log(file)
            this.previewPath = file.response.data.url
            this.previewVisable = true
        },
        handleRemove(file){
            const filePath = file.response.data.tmp_path
            let index =  this.addForm.pics.findIndex(item=>item.pic==filePath)
            this.addForm.pics.splice(index,1)
            this.$message.success('删除成功')
        },
        handelSuccess(res){
            console.log(res)
            this.addForm.pics.push({
                pic:res.data.tmp_path
            })
            this.$message.success('上传成功')
        },
        add(){
            this.$refs.addFormRef.validate(valid=>{
                if(!valid) return this.$message.error('请将必填信息填写完整');
                const form = _.cloneDeep(this.addForm)
                form.goods_cat = form.goods_cat.join(',')
            })
        }
    }
}   

</script>
<style scoped lang="less">
    .el-checkbox{
        margin: 0 5px 0 0 !important;
    }
    
</style>
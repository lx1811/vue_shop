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
            <el-tabs :tab-position="'left'" v-model="activeIndex">
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
                            v-model="goods_cat"
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
                <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
                <el-tab-pane label="商属性片" name="2">商属性片</el-tab-pane>
                <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
                <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
            </el-tabs>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            activeIndex:'0',
            cateList:[],
            selectedCate:[],
            addForm:{
                goods_name:'',
                goods_price:0,
                goods_weight:0,
                goods_number:0,
                goods_cat:[]
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
                ]
            }
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
            console.log(e)
        }
    }
}   

</script>
<style scoped lang="less">
</style>
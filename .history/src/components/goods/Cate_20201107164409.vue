<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
            <el-col>
                <el-button type="primary">添加分类</el-button>
            </el-col>
        </el-row>
        <tree-table :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border stripe>
            <template slot="isok" slot-scope="scope">
                <i class="el-icon-success"></i>
                <i class="el-icon-error"></i>
            </template>
        </tree-table>
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
            columns:[{
                label:'分类名称',
                prop:'cat_name'
            },{
                label:'是否有效',
                type:'template',
                template:'isok'
            }]
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
        }
    }
}

</script>
<style scoped lang="less">
</style>
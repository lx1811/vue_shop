<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row :gutter="20" style="margin-bottom:10px;">
            <el-col :span="10">
            <el-input placeholder="请输入查找商品名称" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            </el-col>
            <el-col :span="5">
            <el-button type="primary">添加商品</el-button>
            </el-col>
        </el-row>
        <el-table :data="goodsList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格(元)" prop="goods_price"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
            <el-table-column label="创建时间" prop="upd_time |timeFilter"></el-table-column>
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
                pagesize:5
            },
            total:0,
            goodsList:[],

        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        async getGoodsList(){
            const {data:res} = await this.$http.get('goods',{
                params:this.queryInfo
            })
            if(res.meta.status!=200) return this.$message(res.meta.msg);
            this.total = res.data.total
            this.goodsList = res.data.goods
        }
    },
    filters:{
        'timeFilter':function(val){
            return val
        }
    }
}

</script>
<style scoped lang="less">
</style>
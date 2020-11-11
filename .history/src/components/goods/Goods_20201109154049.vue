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
            console.log(res)
        }
    }
}

</script>
<style scoped lang="less">
</style>
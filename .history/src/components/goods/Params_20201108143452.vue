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
            <el-col :span="6">
                <span>选择商品分类：</span>
            </el-col>
            <el-col :span="10">
                <el-cascader
                    v-model="value"
                    :options="cateList"
                    :props="{ 
                        expandTrigger: 'hover',
                        value:'cat_id',
                        label:'cat_name',
                        children:'children'
                    }"
                >
                </el-cascader>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            cateList:[],
            value:[]
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
        }
    }
}

</script>
<style scoped lang="less">
</style>
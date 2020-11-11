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
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            cateList:[],
            selectedCateKeys:[]
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
            }
        }
    }
}

</script>
<style scoped lang="less">
</style>
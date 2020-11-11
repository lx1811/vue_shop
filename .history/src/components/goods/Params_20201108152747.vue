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
            <el-tab-pane label="动态参数" name="only">
                <el-button type="primary" size="mini" :disabled="isBtnDisable">添加参数</el-button>
                <el-table :data="paramsData.only" border stripe>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template>

                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="many">
                <el-button type="primary" size="mini" :disabled="isBtnDisable">添加属性</el-button>
            </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            cateList:[],
            selectedCateKeys:[],
            tabsActiveName:'only',
            paramsData:{
                only:[],
                many:[]
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
</style>
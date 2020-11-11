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
        <el-steps :space="200" :active="activeIndex" finish-status="success" style="margin:15px 0px;" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-tabs :tab-position="'left'" style="height: 200px;">
            <el-tab-pane label="基本信息">基本信息</el-tab-pane>
            <el-tab-pane label="商品参数">商品参数</el-tab-pane>
            <el-tab-pane label="商属性片">商属性片</el-tab-pane>
            <el-tab-pane label="商品图片">商品图片</el-tab-pane>
            <el-tab-pane label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return {
            activeIndex:0
        }
    },
    created(){

    },
    methods:{

    }
}   

</script>
<style scoped lang="less">
</style>
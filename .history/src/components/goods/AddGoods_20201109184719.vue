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
            <el-tabs :tab-position="'left'" style="height: 200px;" v-model="activeIndex">
                <el-tab-pane label="基本信息" name="0">基本信息</el-tab-pane>
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
            addForm:{},
            rules:{}
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
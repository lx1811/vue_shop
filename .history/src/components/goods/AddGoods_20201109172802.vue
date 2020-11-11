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
        <el-steps :space="200" :active="0" finish-status="success" style="margin:15px 0px;" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
    </el-card>
  </div>
</template>

<script>
export default {

}

</script>
<style scoped lang="less">
</style>
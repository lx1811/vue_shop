<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-alert type="warning" title="注意：只允许为第三级分类设置参数！" show-icon :closable="false"></el-alert>
        <el-row style="margin:15px;">
            <el-col>
                <span>选择商品分类：</span>
            </el-col>
        </el-row>
    </el-card>
  </div>
</template>

<script>
export default {

}

</script>
<style scoped lang="less">
</style>
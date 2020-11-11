<template>
  <div>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

}

</script>
<style scoped lang="less">
    .el-container{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
    }
    .el-aside{
        background-color: #333744;
    }
    .el-main{
        background-color: #EAEDF1;
    }
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-table :data="rightsList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <!-- <el-table-column label="权限等级">
                <template slot-scope="scope">

                </template>
            </el-table-column> -->
        </el-table>
    </el-card>
  </div>
</template>

<script>
import func from '../../../vue-temp/vue-editor-bridge'
export default {
    data(){
        return {
            rightsList:[]
        }
    },
    created(){
        this.getRightsList()
    },
    methods:{
        async getRightsList(){
            const {data:res} = await this.$http.get('rights/list')
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.rightsList = res.data
        }
    },
    filters:{
        'levelValue':function(value){
            if(parseInt(value)==1){

            }else if(parseInt(value)==2){

            }else{

            }
        }
    }
}

</script>
<style scoped lang="less">
</style>
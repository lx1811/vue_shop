<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>

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
            ordersList:[],
            total:0
        }
    },
    created(){
        this.getOrdersList()
    },
    methods:{
        async getOrdersList(){
            const {data:res} = await this.$http.get('orders',{
                params:this.queryInfo
            })
            console.log(res)
            this.ordersList = res.data.goods
            this.total = res.data.total
        }
    }
}

</script>
<style scoped lang="less">
</style>
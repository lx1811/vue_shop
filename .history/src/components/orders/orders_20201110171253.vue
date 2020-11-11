<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row :gutter="20" style="margin-bottom:10px;">
        <el-col :span="10">
          <el-input placeholder="请输入查找订单ID" class="input-with-select" v-model="queryInfo.query" clearable @clear="getOrdersList">
            <el-button slot="append" icon="el-icon-search" @click="getOrdersList"></el-button>
          </el-input>
        </el-col>
        </el-row>
        <el-table :data="ordersList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="订单编号" prop="order_number"></el-table-column>
            <el-table-column label="订单价格" prop="order_price"></el-table-column>
            <el-table-column label="是否付款">
                <template slot-scope="scope">
                    <el-tag type="danger"  v-if="scope.row.pay_status=='0'">未付款</el-tag>
                    <el-tag type="success" v-else>已付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否发货" prop="is_send"></el-table-column>
            <el-table-column label="下单时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_time | timeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 10]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
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
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.ordersList = res.data.goods
            this.total = res.data.total
        },
        handleSizeChange(){

        },
        
    },
    filters:{
        'timeFilter':function(val){
            let date = new Date(val)
            let year = date.getFullYear()+''
            let month = date.getMonth()+''
            let day = date.getDate()+''
            let hour = date.getHours()+''
            let mins = date.getMinutes()+''
            let secds = date.getSeconds()+''
            return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')} ${hour.padStart(2,'0')}:${mins.padStart(2,'0')}:${secds.padStart(2,'0')}`
        }
    }
}

</script>
<style scoped lang="less">
</style>
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row :gutter="20" style="margin-bottom:10px;">
            <el-col :span="10">
            <el-input placeholder="请输入查找商品名称" class="input-with-select" v-model="queryInfo.query" clearable @clear="getGoodsList">
                <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
            </el-input>
            </el-col>
            <el-col :span="5">
            <el-button type="primary">添加商品</el-button>
            </el-col>
        </el-row>
        <el-table :data="goodsList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="商品名称" prop="goods_name"></el-table-column>
            <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
            <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
            <el-table-column label="创建时间"  width="160px">
                <template slot-scope="scope">
                    <span>{{scope.row.upd_time | timeFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="130px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 15, 20]"
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
            total:0,
            goodsList:[],

        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        async getGoodsList(){
            const {data:res} = await this.$http.get('goods',{
                params:this.queryInfo
            })
            if(res.meta.status!=200) return this.$message.error(res.meta.msg);
            this.total = res.data.total
            this.goodsList = res.data.goods
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getGoodsList()
        },
        handleCurrentChange(newCurrent){
            this.queryInfo.pagenum = newCurrent
            this.getGoodsList()
        },
        searchGoods(){
            if(this.queryInfo.query == '') return this.$message.error('搜索内容不能为空');
            this.getGoodsList()
        },
        deleteGoods({goods_id:id}){
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const {data:res} = await this.$http.delete(`goods/${id}`)
                if(res.meta.status!=200) return this.$message.error(res.meta.msg);
                this.$message.success(res.meta.msg)
                this.getGoodsList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
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
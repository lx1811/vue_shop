<template>
  <div class="login_container">
      <div class="login_box">
          <div class="avatar_box">
              <img src="../assets/logo.png">
          </div>
          <el-form label-width="0px" class="login_form">
            <el-form-item>
                <el-input prefix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary">登陆</el-button>
                <el-button type="info">重置</el-button>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {

}

</script>
<style scoped lang="less">
    .login_container{
        height: 100%;
        background-color: skyblue;
    }
    .login_box{
        width: 450px;
        height: 300px;
        background-color:white;
        border-radius: 15px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        .avatar_box{
            width: 130px;
            height: 130px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            border-radius: 50%;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            img{
                width: 100px;
                height: 100px;
                margin: 15px;
                background-color: #ddd;
                border-radius: 50%;
            }
        }
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
    }
</style>
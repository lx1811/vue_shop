<template>
  <div class="login_container">
      <div class="login_box">
          <div class="avatar_box">
              <img src="../assets/logo.png">
          </div>
          <el-form label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
            <el-form-item prop="username">
                <el-input prefix-icon="iconfont iconvueShop_user" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input prefix-icon="iconfont iconvueShop_password" v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登陆</el-button>
                <el-button type="info" @click="resetLoginInfo">重置</el-button>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
export default {
    data:function(){
        return {
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules:{
                //required:是否为必填项
                //trigger:触发条件
                username:[
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '账号长度应该在3~10个字符之间', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '密码长度应该在6~15个字符之间', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        resetLoginInfo(){
            this.$refs.loginFormRef.resetFields()
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
                console.log(valid)
                if(!valid) return;
                const result = await this.$http.post("login",this.loginForm)
                console.log(result)
            })
        }
    }
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
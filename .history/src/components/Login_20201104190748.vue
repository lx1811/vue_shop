<template>
  <div class="login_container">
      <div class="login_box">
          <div class="avatar_box">
              <img src="../assets/logo.png">
          </div>
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
            display: flex;
            align-items: center;
            justify-items: center;
            box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
            border-radius: 50%;
            img{
                width: 100px;
                height: 100px;
            }
        }
    }
</style>
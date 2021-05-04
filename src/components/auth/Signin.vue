<template>
  <div class="container-fluid">
      <div class="row justify-content-center">
          <div class="col-md-5 my-5">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Login</h2>
                </div>
                <div class="card-body">
                    <el-form :model="form" ref="ruleForm"
                        class="demo-ruleForm">
                        <el-form-item label="Email" prop="email"
                        placeholder="Enter your email address"
                        :rules="[
                            {required:true, message:'Please Email is required', trigger: 'blur'},
                            {type:'email', message:'Enter a valid Email', trigger: 'blur'}
                        ]">
                            <el-input v-model="form.email" placeholder="me@example.com"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password"
                        
                        :rules="{required:true, message:'Please Password is required', trigger: 'blur'}">
                            <el-input placeholder="xxxxxxx" v-model="form.password" show-password></el-input>
                        </el-form-item>
                        <p>
                            Don't have an account? <a href="/signup">Sign up</a>
                        </p>
                        <el-form-item>
                            <el-button :loading="isLoading" style="float: right" type="primary" @click="submit('ruleForm')">Create</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'signup',
    data() {
        return {
            isLoading : false,
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        
        submit(formName) {
            this.isLoading = true
            this.$refs[formName].validate((valid) => {

            if (valid) {
                
                this.$http.post(`http://localhost:8001/api/user/signin`, this.form)
                    .then( res => {
                        if(res) {
                            this.isLoading = false
                           
                             this.$message({
                                message: 'Login successfully',
                                type: 'success'
                            });

                            localStorage.setItem("user", JSON.stringify(res.data.user))
                            localStorage.setItem("token", JSON.stringify(res.data.token))
                            setTimeout(() => { this.$router.push('/user/dashboard')}, 3000)

                        }
                    }).catch( err => {
                        this.isLoading = false
                      
                             this.$message({
                                message: 'An error occured. Try again',
                                type: 'error'
                            });
                    })

            } else {
            
                this.isLoading = false

                return false;

            }
            });

        }
    }

}
</script>

<style scoped>
.container-fluid{
    /* background-color:#409EFF; */
    background-color: #183153;
    height: 100vh;
}
</style>
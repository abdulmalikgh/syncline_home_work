<template>
  <div class="container-fluid">
      <div class="row justify-content-center">
          <div class="col-md-5 my-5">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Sign Up</h2>
                </div>
                <div class="card-body">
                    <el-form :model="form" ref="ruleForm"
                        class="demo-ruleForm">
                        <el-form-item label="First Name" prop="first_name"
                            :rules="{required:true, message:'Please First Name is required', trigger: 'blur'}">
                            <el-input v-model="form.first_name" placeholder="kofi"></el-input>
                        </el-form-item>
                        <el-form-item label="Last Name" prop="last_name"
                        :rules="{required:true, message:'Please Last Name is required', trigger: 'blur'}">
                            <el-input v-model="form.last_name" placeholder="Ghana"></el-input>
                        </el-form-item>
                        <el-form-item label="Phone Number" prop="phone"
                        :rules="{required:true, message:'Please Phone Number is required', trigger: 'blur'}">
                            <el-input maxlength="10"  placeholder="0248594545" show-word-limit v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email"
                        :rules="[
                            {required:true, message:'Please Email is required', trigger: 'blur'},
                            {type:'email', message:'Enter a valid Email', trigger: 'blur'}
                        ]">
                            <el-input v-model="form.email" placeholder="Kofi@ghana.com"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password"
                        :rules="{required:true, message:'Please Password is required', trigger: 'blur'}">
                            <el-input v-model="form.password" placeholder="xxxxxxx" show-password></el-input>
                        </el-form-item>
                        <p class="">
                            I have an account? <a href="/login">Login</a>
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
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                password: ''
            }
        }
    },
    methods: {

        submit(formName) {

            this.isLoading = true
            this.$refs[formName].validate((valid) => {
            
            if (valid) {

                this.form.role = "USER"

                this.$http.post(`http://localhost:8001/api/user/create`, this.form)
                    .then( res => {
                        if(res) {
                            this.isLoading = false
                            
                            this.$message({
                                    message: 'Login successfully',
                                    type: 'success'
                                });
                            localStorage.setItem("user", JSON.stringify(res.data.user))
                            localStorage.setItem("token", JSON.stringify(res.data.token))
                            setTimeout(() => { window.location.replace('dashboard')}, 3000)
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
}
</style>
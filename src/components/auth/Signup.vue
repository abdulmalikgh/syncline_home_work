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
                            <el-input v-model="form.first_name"></el-input>
                        </el-form-item>
                        <el-form-item label="Last Name" prop="last_name"
                        :rules="{required:true, message:'Please Last Name is required', trigger: 'blur'}">
                            <el-input v-model="form.last_name"></el-input>
                        </el-form-item>
                        <el-form-item label="Phone Number" prop="phone"
                        :rules="{required:true, message:'Please Phone Number is required', trigger: 'blur'}">
                            <el-input maxlength="10"  show-word-limit v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email"
                        :rules="[
                            {required:true, message:'Please Email is required', trigger: 'blur'},
                            {type:'email', message:'Enter a valid Email', trigger: 'blur'}
                        ]">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password"
                        :rules="{required:true, message:'Please Password is required', trigger: 'blur'}">
                            <el-input v-model="form.password" show-password></el-input>
                        </el-form-item>
                        <p>
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
                            const h = this.$createElement;
                            this.$message({
                            message: h('p', null, [
                                h('span', null, 'Account created successfully'),
                                h('i', { style: 'color: teal' }, 'VNode')
                            ])
                            });
                            localStorage.setItem("user", JSON.stringify(res.data.user))
                            localStorage.setItem("token", JSON.stringify(res.data.token))
                            setTimeout(() => { window.location.replace('dashboard')}, 3000)
                        }
                    }).catch( err => {
                        this.isLoading = false
                        const h = this.$createElement;
                            this.$message({
                            message: h('p', null, [
                                h('span', null, 'An error occured, Try again'),
                                h('i', { style: 'color: teal' }, 'VNode')
                            ])
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

<style>

</style>
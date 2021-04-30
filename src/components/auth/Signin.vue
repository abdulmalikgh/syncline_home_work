<template>
  <div class="container-fluid">
      <div class="row justify-content-center">
          <div class="col-md-5 my-5">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Login</h2>
                </div>
                <div class="card-body">
                    <el-form :model="form" :rules="rules" ref="ruleForm"
                        class="demo-ruleForm">
                        <el-form-item label="Email" prop="email"
                        placeholder="Enter your email address"
                        :rules="[
                            {required:true, message:'Please Email is required', trigger: 'blur'},
                            {type:'email', message:'Enter a valid Email', trigger: 'blur'}
                        ]">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password"
                        placeholder="Enter your password"
                        :rules="{required:true, message:'Please Password is required', trigger: 'blur'}">
                            <el-input v-model="form.password" show-password></el-input>
                        </el-form-item>
                        <p>
                            Don't have an account? <a href="/signup">Sign up</a>
                        </p>
                        <el-form-item>
                            <el-button style="float: right" type="primary" @click="submit('ruleForm')">Create</el-button>
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
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        
        submit(formName) {
            this.$refs[formName].validate((valid) => {

            if (valid) {
                
                console.log(form)

            } else {
            
                return false;

            }
            });

        }
    }

}
</script>

<style>

</style>
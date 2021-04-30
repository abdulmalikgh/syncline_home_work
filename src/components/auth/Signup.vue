<template>
  <div class="container-fluid">
      <div class="row justify-content-center">
          <div class="col-md-5 my-5">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Sign Up</h2>
                </div>
                <div class="card-body">
                    <el-form :model="form" :rules="rules" ref="ruleForm"
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
<template>
  <div class="container-fluid">

    <div class="row justify-content-center nav">
      <div class="col">
        <ul>
          <li><a class="brand" href="/dashboard">H-consort</a></li>
          <li class="welcome">
            Welcome! {{user.first_name}} {{user.last_name}} 
            <button @click="logout"  class="logout"><i class="fas fa-sign-out-alt "></i></button>
          </li>
        </ul>
      </div>
    </div>
     
     <div class="row justify-content-center main-content" v-if="loading">
       <div class="d-flex justify-content-center my-4">
        <div class="spinner-border my-5" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
     </div>

    <div class="row justify-content-center main-content" v-if="!loading">

      <div class="col-md-12 my-4">
        <button class="new_issue" data-toggle="modal" data-target="#staticBackdrop"> New Issue </button>
      </div>

      <div class="col-md-12">
        <h2>My Issues</h2>
      </div>
      <div class="col-md-12 my-3 card" v-if="issues.length < 1">
          <p class="py-5">No issues available</p>
      </div>

      <div class="col-md-12 card my-2" v-for="(issue, key) in issues" :key="key">
          <div class="col-md-12 my-2">
             <h3>{{issue.issueTitle}}</h3>
             <hr>
            <p>{{issue.issueBody}}</p>
             <!-- <span><strong>Issued on</strong> {{issue.createdAt}}</span> -->
             <button class="replies">Replies</button>
        </div>

      </div>

    </div>

  <!-- modal content -->
  <div class="modal fade" 
  id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Report an Issue</h5>
        <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addIssue">
          <div class="form-group">
             <label for="title">Title</label>
            <input type="text" v-model="form.issueTitle" class="form-control" id="title" placeholder="Enter issue title" required/>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea rows="7" required id="description" v-model="form.issueBody" class="form-control" placeholder="Enter issue description" > </textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary submit">  
                <span v-if="isLoading">Loading..</span>
                <span v-if="!isLoading">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  name:'doctor-dashboard',
  data() {

    return {

      issues:[],
      isLoading: false,
      loading: false,

      form: {
        issueTitle:'',
        issueBody:'',
      }

    }

  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'))
    },
    token(){
      return JSON.parse(localStorage.getItem('token'))
    }
  },
  mounted() {
    this.getUserIssues()
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push('/login')
    },
    getUserIssues() {

      this.loading = true

      this.$http.get(`http://localhost:8001/api/issues/${this.user._id}`, {
         headers: {
          'Authorization': `bearer ${this.token}`
        }
      })
        .then( response => {
          console.log('response', response.data)
          if(response) {

            this.issues = response.data.issues

            this.loading = false

          }
        }).catch( err => console.log(err))

    },
    addIssue() {
      
      this.isLoading = true
      this.form.userID = this.user._id
      
      this.$http.post(`http://localhost:8001/api/issues/create`, this.form,{
        headers: {
          'Authorization': `bearer ${this.token}`
        }
      }).then( response => {
        this.isLoading = false
       this.$message({
            message: 'Issue created',
            type: 'success'
        });
        this.form = {

        }
      }).catch(err => {
        this.isLoading = false
         this.$message({
              message: 'An error occured. Try again',
              type: 'error'
          });
      })

    }
  },
  // created() {
  //   this.getUserIssues()
  // }
}
 </script>

<style scoped>
.container-fluid{
  margin: 0;
  padding:0;
}
.nav{
    background-color:#183153;
    width:100%;
    height: 100px;
    margin:0;
    padding-right: 15%;
    padding-left: 15%;
}
ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  align-items: center;
  padding-top:35px;
  padding-left: 0!important;
}
.welcome {
  color:#FFD43B;
}
.brand{
  font-weight: bolder;
  color:#fff;
  text-decoration: none;
  font-size: 1.4em;
}
.logout{
  color:#FFD43B;
  border:none;
  outline:none;
  background-color:transparent;
  font-size: 1.5em;
  transition: all 0.5s;
}
.logout:hover, .submit:hover{
  opacity: 0.7;
}
.main-content{
  padding-left: 15%;
  padding-right:15%;
  width:100%;
  margin:0;
  background-color: aliceblue;
}
.new_issue{
  float:right;
  background-color: #183153;
  color:#FFD43B;
  outline:none;
  border:none;
  padding:10px 20px;
  transition: all 0.5s;
}
.new_issue:hover{
  outline:none;
  border:none;
  opacity:0.8 ;
}
.submit{
  background-color: #183153;
  color:#FFD43B;
  outline:none;
  border:none;
  transition: all 0.5s; 
}
.modal-header{
 background-color: #183153;
 color:#FFD43B;
}
/* card */
.replies{
  float:right;
  outline:none;
  background-color: #FFD43B;
  color:#183153;
  transition: all 0.6s;
  border: none;
  padding:5px 10px;
  font-size: bold;
}
.replies:hover{
  background-color:#183153;
  color:#fff;
}
@media screen and (max-width:600px) {
  /* .nav{
    padding-right: 2%;
    padding-left: 2%;
  } */
}
</style>
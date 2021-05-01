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
  </div>
</template>

<script>
export default {
  name:'home',
  data() {
    return {
      user : JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.replace('/login')
    }
  }
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
}
.logout:hover{
  opacity: 0.7;
}
@media screen and (max-width:600px) {
  /* .nav{
    padding-right: 2%;
    padding-left: 2%;
  } */
}
</style>
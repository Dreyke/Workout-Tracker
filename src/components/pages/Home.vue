<template>
<div>
  <h3>Home Page</h3>
  <ul v-if="users != null">
    <li v-for="user in users"
        :key="user.id">
      {{ user.username }}
    </li>
  </ul>
</div>
</template>

<script>
import Axios from 'axios'
import Authentication from '@/components/pages/Authentication'
const WorkoutAPI = `http://${window.location.hostname}:3000`

export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    this.getAllUsers()
  },
  methods: {
    getAllUsers (context) {
      Axios.get(`${WorkoutAPI}/api/v1/users`, {
        headers: {
          'Authorization': Authentication.getAuthenticationHeader(this)
        }
      }).then(({data}) => (this.users = data))
    }
  }
}
</script>

<style lang="scss">

</style>

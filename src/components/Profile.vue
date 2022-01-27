<template>
  <div class="container">
    <h1>My Profile</h1>
    <table class="table table-dark">
      <tbody>
        <tr>
          <th scope="col">First Name</th>
          <td>{{ firstname }}</td>
        </tr>
        <tr>
          <th scope="col">Last Name</th>
          <td>{{ lastname }}</td>
        </tr>
        <tr>
          <th scope="col">Email ID</th>
          <td>{{ email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { profile } from "@/common/Service";
export default {
  name: "Profile",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
    };
  },
  mounted() {
    profile()
      .then((res) => {
        this.firstname = res.data.profile.firstname;
        this.lastname = res.data.profile.lastname;
        this.email = res.data.profile.email;
        console.log(res.data.profile);
      })
      .catch((error) => {
        console.log("Something Wrong " + error);
      });
  },
};
</script>

<style>
</style>
<template>
  <div class="page404" style="min-height:100vh">
    <v-container style="position: relative; top:5%; width:60%;">
      <v-layout>
        <h1 style="text-align:center; font-size:150px; width:100%;">404</h1>
      </v-layout>
      <v-layout row wrap >
        <v-flex sm6 text-sm-center>
          <img style="width:50%; border-radius: 100%;" class="logo-login" src="@/assets/logo/sad_amara.png" alt="">
        </v-flex>
        <v-flex sm6 class="404">
          <h1 style="">Page Not Found</h1>
            <p style="margin-bottom:0;">We can't find the page you're looking for.</p>
            <p style="">You can either return to the previous page or visit our homepage or contact our support team.</p>
            <v-btn small target="_blank" to="/" color="primary" style="text-transform: capitalize; ">Visit Homepage</v-btn>
            <v-btn outline small target="_blank" to="/support" color="primary" style="text-transform: capitalize; ">Contact Us</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'PageNotFound'
};

</script>

<style lang="scss" scoped>

</style>

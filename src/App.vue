<template>
  <div id="app">
    <tetikus showDefaultCursor="true"/>
    <div class="main">
      <navbar />
      <router-view />
    </div>
    <customFooter />
  </div>
</template>

<script>
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default {
  name: "App",
  components: {
    navbar: Navbar,
    customFooter: Footer,
  },
};
</script>

<style src="@/assets/styles/global.scss" lang="scss"></style>
<style>
body {
  background-color: #ffffff !important;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

::-webkit-scrollbar {
  display: none;
}
</style>

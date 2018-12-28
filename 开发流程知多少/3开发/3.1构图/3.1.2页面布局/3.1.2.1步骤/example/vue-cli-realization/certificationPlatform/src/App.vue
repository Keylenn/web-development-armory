<template>
  <div id="app">
    <home-header></home-header>
    <home-main></home-main>
    <home-footer></home-footer>
  </div>
</template>

<script>
import Header from './components/home/Header'
import Main from './components/home/Main'
import Footer from './components/home/Footer'

export default {
  name: 'App',
  components: {
    homeHeader: Header,
    homeMain: Main,
    homeFooter: Footer
  }
}
</script>

<style>
</style>

<template>
    <div>
      <div id="symptoms-figure-container">
        <panZoom selector=".zoomable">
          <div class="zoomable">
            <img alt="Vue logo" src="../assets/images/woman-front.svg">
          </div>
        </panZoom>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Symptoms',
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/symptoms.scss";
</style>

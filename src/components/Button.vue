<template>
    <div>
        <button type="submit">
        <img src="@/assets/images/add_icon_symptoms_s.svg" />
        Symptome hinzufügen
        </button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        color: String,
    },
    //methods: {
        //onClick() {
            //this.$show()
      //  }
   // }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/components/button.scss";
</style>
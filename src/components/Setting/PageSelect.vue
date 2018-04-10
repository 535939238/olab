<template>
    <div id="PageSelect">
        <ActivityList ref="actlist" :items="items" @select="$emit('select',arguments[0].id)"/>
        <Pagination @page="pageat=arguments[0]" @div="div=arguments[0]" :pagenum="pagenum" />        
    </div>
</template>

<script>
import BaseSelect from "./BaseSelect";
import ActivityList from "@/components/MainPage/ActivityList";
export default {
  name: "",
  mixins: [BaseSelect],
  components: {
    ActivityList
  },
  data() {
    return {
      type: "page"
    };
  },
  methods: {}
};
</script>

<style lang='scss'>
#PageSelect {
}
</style>
<template>
    <div id='TimelineMain'>
        <p class="subtitle subtitle-lg wow fadeInUp">
            O-Lab时刻表
        </p>
        <p class="subtitle subtitle-sm wow fadeInUp" data-wow-delay=".4s">
            O-Lab Timeline
        </p>
        <TimelinePage />
    </div>
</template>

<script>
import TimelinePage from '@/components/Timeline/TimelinePage'
export default {
  name: '',
  components :{
      TimelinePage
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang='scss'>
#TimelineMain {
  margin-bottom: 20px;
  p.pretitle,
  .input-group,
  .btn {
    display: none;
  }
}
</style>
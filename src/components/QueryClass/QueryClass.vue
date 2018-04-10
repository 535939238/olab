<template>
  <div id='QueryClass' class="container">
      <p class="pretitle">课表查询</p>
    <ClassTable :queryid="queryid"></ClassTable>
    <div class="input-group col-sm-6 col-sm-offset-3 col-xs-12" style="margin-top: 15px">
      <span class="input-group-addon">学号</span>
      <input type="text" class="form-control" v-model="id">
      <div class="input-group-btn">
        <div class="btn btn-primary" @click="queryid=id">查询</div>
      </div>      
    </div>        
  </div>
</template>

<script>
import ClassTable from './ClassTable';
export default {  
  name: '',
  components:{
      ClassTable
  },
  data () {
    return {
      id:"15020022004",
      queryid: "15020022004"
    }
  }  
}
</script>

<style lang='scss'>
#QueryClass{

}
</style>
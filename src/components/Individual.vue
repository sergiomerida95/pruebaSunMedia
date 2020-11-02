<template>
  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-lg-5">
      <div class="media">
        <a class="pull-left">
          <img
            class="media-object dp img-circle"
            :src="team.logos[0]"
            @error="
              $event.target.src =
                'http://a.espncdn.com/i/teamlogos/ncaa/500/2747.png'
            "
            style="width: 100px; height: 100px"
          />
        </a>
        <div class="media-body">
          <h4 class="media-heading">{{team.school}}<small> {{team.abbreviation}}</small></h4>
           
          <h5>
            {{team.mascot}}
          </h5>
          
          <hr style="margin: 8px auto" />
          <h5>
            {{team.alt_name3}}
          </h5>
          <span v-if="team.conference" class="label label-default">{{team.conference}} / </span>
          <span v-else class="label label-default">Sin conferencia / </span>
          <span v-if="team.division" class="label label-default">{{team.division}}</span>
          <span v-else class="label label-default">Sin división</span>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Individual",

  data() {
    return {
      team: {},
    };
  },
  created() {

    let teamData = this.$route.params.team;

    if (teamData) {
      this.team = teamData;
    }
  },
};
</script>

<style >
.media {
  box-shadow:0px 0px 4px -2px #000;
  margin: 20px 0;
  padding: 30px;
}
.dp {
  border: 10px solid #eee;
  transition: all 0.2s ease-in-out;
}
.dp:hover {
  border: 2px solid #eee;
  transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
.circle {
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid;
}
</style>
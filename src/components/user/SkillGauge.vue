<template>
  <AbsoluteLayout width="120" height="130" class="w-1/3 h-32">
    <Label
      class="w-full text-center font-bold text-sm"
      :text="skill.name"
    ></Label>
    <Label
      top="60"
      class="w-full text-center text-sm"
      :text="getLevelLabel(skill.level)"
    ></Label>
    <RadRadialGauge top="20" class="w-full" height="100" ref="gauge">
      <RadialScale
        ref="skillScale"
        v-tkRadialGaugeScales
        startAngle="270"
        sweepAngle="360"
        minimum="0"
        maximum="4"
        radius="1"
      >
        <ScaleStyle
          v-tkRadialScaleStyle
          ticksVisible="false"
          labelsVisible="false"
          lineThickness="0"
        ></ScaleStyle>

        <RadialBarIndicator
          v-tkRadialScaleIndicators
          minimum="0"
          :maximum="skill.level"
          location="1"
        >
          <BarIndicatorStyle
            v-tkRadialBarIndicatorStyle
            :fillColor="getBarColor(skill.level)"
            barWidth="0.2"
          ></BarIndicatorStyle>
        </RadialBarIndicator>
        <RadialBarIndicator
          v-tkRadialScaleIndicators
          minimum="0"
          maximum="4"
          location="1"
        >
          <BarIndicatorStyle
            v-tkRadialBarIndicatorStyle
            fillColor="rgba(220,220,220,0.3)"
            barWidth="0.2"
          ></BarIndicatorStyle>
        </RadialBarIndicator>
      </RadialScale>
    </RadRadialGauge>
  </AbsoluteLayout>
</template>

<script>
export default {
  props: ["skill"],
  data() {
    return {
      maxChar: 10,
    };
  },
  computed: {
    label() {
      if (this.skill.name.length > this.maxChar) {
        return this.skill.name.slice(0, this.maxChar)[0] + "...";
      } else {
        return this.skill.name;
      }
    },
  },
  methods: {
    getBarColor(level) {
      switch (level) {
        case 1:
          return "rgb(1, 255, 133)";
        case 2:
          return "rgb(255, 235, 0)";
        case 3:
          return "rgb(255, 190, 115)";
        case 4:
          return "rgb(255, 12, 12)";
      }
    },
    getLevelLabel(level) {
      switch (level) {
        case 1:
          return "Novice";
        case 2:
          return "Intermediate";
        case 3:
          return "Advanced";
        case 4:
          return "Expert";
      }
    },
  },
};
</script>

<style>
</style>
<!--
  Based on the implementation from Muse-UI: https://github.com/museui/muse-ui/blob/master/src/timeLine/timelineItem.vue
  This lets us tweak the appearance as we see fit and add other properties
-->
<template>
  <div class="mu-timeline-item">
    <div v-if="!last" class="mu-timeline-item-line" :style="lineStyle"></div>
    <div class="mu-timeline-item-icon">
      <slot name="icon" :style="customedStyle" class="mu-timeline-item-customed">
        <div :style="iconStyle"></div>
      </slot>
    </div>
    
    <div class="mu-timeline-item-content" :style="contentStyle">
      <slot>
        <div class="mu-timeline-item-time">
          <slot name="time" ></slot>
        </div>
        <div class="mu-timeline-item-des">
          <slot name="des"></slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import { oneOf } from '../../utils/assist';

  export default {
    name: 'timeline-item',
    props: {
      iconColor: {
        type: String,
        default: '',
      },
      iconType: {
        type: String,
        default: '',
        validator(val) {
          const arr = ['', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'];
          return oneOf(val, arr);
        },
      },
      iconLine: {
        type: String,
        default: '',
      },
      lineColor: {
        type: String,
        default: '',
      },
      lineType: {
        type: String,
        default: '',
        validator(val) {
          const arr = ['', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'];
          return oneOf(val, arr);
        },
      },
    },
    data() {
      return {
        line: {},
        icon: {},
        last: false,
      };
    },
    computed: {
      lineStyle() {
        let color = this.line.color;
        let type = this.line.type;
        if (this.lineColor !== '') {
          color = this.lineColor;
        }
        if (this.lineType !== '') {
          type = this.lineType;
        }
        return {
          borderLeft: `${type} ${this.line.width}px ${color}`,
          left: `${(this.icon.width / 2) - (this.line.width / 2)}px`,
        };
      },
      iconStyle() {
        let color = this.icon.color;
        let type = this.icon.type;
        let line = this.icon.line;
        if (this.iconColor !== '') {
          color = this.iconColor;
        }
        if (this.iconType !== '') {
          type = this.iconType;
        }
        if (this.iconLine !== '') {
          line = this.iconLine;
        }
        return {
          border: `${type} ${line}px ${color}`,
          width: `${this.icon.width}px`,
          height: `${this.icon.width}px`,
          borderRadius: '50%',
        };
      },
      contentStyle() {
        return {
          left: `${this.icon.width * 2}px`,
        };
      },
      customedStyle() {},
    },
  };
</script>

<style scoped>
.mu-timeline-item {
  position: relative;
}
.mu-timeline-item-line {
  position: absolute;
  height: 100%;
}
.mu-timeline-item-icon {
  position: absolute;
  box-sizing: border-box;
  background-color: white;
}
.mu-timeline-item-content {
  position: relative;
  padding-bottom: 20px;
}
.mu-timeline-item-customed {
  position: absolute;
}
.mu-timeline-item-time {
  font-weight: bold;
  font-size: 15px;
}
.mu-timeline-item-des {
  font-size: 16px;
}
</style>
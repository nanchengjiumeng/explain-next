<template>
  <div class="board__box" ref="board"></div>
  <audio></audio>
  <div class="selection">
    Shape:
    <select v-model="shape">
      <option :value="s.val" v-for="s in penShapeList" :key="s.val">
        {{ s.name }}
      </option>
    </select>
    Color:
    <select v-model="color">
      <option :value="c.val" v-for="c in penColorList" :key="c.val">
        {{ c.name }}
      </option>
    </select>
    StrokeWidthList:
    <select v-model="stokeWidth">
      <option :value="s.val" v-for="s in StrokeWidthList" :key="s.val">
        {{ s.name }}
      </option>
    </select>
    ScaleTimesList:
    <select v-model="ScaleTimes">
      <option :value="s.value" v-for="s in ScaleTimesList" :key="s.value">
        {{ s.name }}
      </option>
    </select>
    locked:{{ locked }}
    <button @click="locked = !locked">
      {{ locked ? "已锁定" : "已打开" }}
    </button>
    <button @click="loadSVGString">加载文件</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ComponentInternalInstance,
  onUnmounted,
  onErrorCaptured,
} from "vue";
import "../packages/board/index";
import * as draw from "./draw";
import { load as loadSVGFromUri } from "../packages/loaders";
export default defineComponent({
  name: "Board",
  setup: () => {
    const instanceComp: ComponentInternalInstance | null = getCurrentInstance();
    let instanceDraw: draw.Result = draw.init();
    onMounted(() => {
      if (instanceComp && instanceComp.refs.board) {
        (instanceComp.refs.board as HTMLElement).appendChild(instanceDraw.dom);
      }
    });

    onUnmounted(() => {
      if (draw) {
        instanceDraw.doc.destroy();
      }
    });

    onErrorCaptured(() => {
      console.log("出错了");
    });

    const loadSVGString = async () => {
      const svgStringParsed = await loadSVGFromUri("/test.svg?123");
      console.log(svgStringParsed);

      instanceDraw.inputSvgString(svgStringParsed.originalSvgString);
    };

    return {
      ...instanceDraw,
      loadSVGString,
    };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
.board__box {
  margin: 0 auto;
  width: 400px;
  box-shadow: #304455 0 0 15px;
}
.selection {
  margin-top: 15px;
}
</style>

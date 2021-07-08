<template>
  <div class="board__box">
    <div ref="board"></div>
  </div>
  <div class="selection">
    Shape:
    <select v-model="shape">
      <option :value="s.val" v-for="s in penShapeList" :key="s.val">{{ s.name }}</option>
    </select>
    Color:
    <select v-model="color">
      <option :value="c.val" v-for="c in penColorList" :key="c.val">{{ c.name }}</option>
    </select>
    StrokeWidthList:
    <select v-model="stokeWidth">
      <option :value="s.val" v-for="s in StrokeWidthList" :key="s.val">{{ s.name }}</option>
    </select>
    locked:{{ locked }}
    <button @click="locked = !locked">{{ locked ? "已锁定" : "已打开" }}</button>
  </div>
</template>

<script lang="ts">
import SVG from 'svg.js'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ComponentInternalInstance,
  ref,
  Ref,
  onUnmounted,
} from "vue";
import "../packages/board/index";
import { createSvgDraw } from "../packages/board/index";
import {
  penColorList,
  PenColors,
  penShapeList,
  PenShapes,
  StrokeWidthList,
  StrokeWidths,
} from "../packages/board/vars";
export default defineComponent({
  name: "Board",
  setup: () => {
    const _this: ComponentInternalInstance | null = getCurrentInstance();
    const shape: Ref<PenShapes> = ref(penShapeList[0].val) as Ref<PenShapes>;
    const color: Ref<PenColors> = ref(penColorList[0].val) as Ref<PenColors>;
    const stokeWidth: Ref<StrokeWidths> = ref(StrokeWidthList[0].val);
    const locked: Ref<Boolean> = ref(false);
    let draw: SVG.Doc | undefined;
    onMounted(() => {
      if (_this && _this.refs.board) {
        draw = createSvgDraw(
          _this.refs.board as HTMLElement,
          shape,
          color,
          stokeWidth,
          locked,
          200,
          300
        );
      }
    });

    onUnmounted(() => {
      if (draw) {
        draw.destroy()
      }
    })


    return {
      locked,
      shape,
      color,
      stokeWidth,
      penShapeList,
      penColorList,
      StrokeWidthList,
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

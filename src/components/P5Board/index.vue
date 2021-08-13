<template>
  <audio ref="audio" controls autoplay muted></audio>
  <div ref="board" class="board"></div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import { setup as createBoard } from "../../packages/p5board/index";
const instance = getCurrentInstance();
onMounted(() => {
  const eleBoard = instance?.refs["board"] as HTMLElement;
  const eleAudio = instance?.refs["audio"] as HTMLAudioElement;
  createBoard(eleBoard, eleAudio);
});
</script>

<style lang="scss" scoped="">
.board {
  width: 500px;
  height: 500px;
}
</style>

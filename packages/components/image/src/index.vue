<template>
  <div class="line-image" :style="{ backgroundColor: mainColor }">
    <el-image
      ref="image"
      :src="currentSrc"
      :alt="alt"
      :fit="fit"
      :lazy="lazy"
      :referrer-policy="referrerPolicy"
      :scroll-container="scrollContainer"
      :preview-src-list="srcList"
      :z-index="zIndex"
      @load="load"
      @error="error"
    >
      <div slot="placeholder" class="image-slot">
        <img
          class="default"
          :style="{ 'object-fit': fit }"
          src="https://devops01.oss-cn-shanghai.aliyuncs.com/staticImg/image_loading.jpg"
          alt=""
        />
      </div>
      <div v-if="currentSrc" slot="error" class="image-slot">
        <img
          class="default"
          :style="{ 'object-fit': fit }"
          src="https://devops01.oss-cn-shanghai.aliyuncs.com/staticImg/image_error.jpg"
          alt=""
        />
      </div>
      <div v-else slot="error" class="image-slot">
        <img
          class="default"
          :style="{ 'object-fit': fit }"
          src="https://devops01.oss-cn-shanghai.aliyuncs.com/staticImg/image_null.jpg"
          alt=""
        />
      </div>
    </el-image>
    <!-- preview -->
    <template v-if="preview">
      <div class="preview-wrap">
        <i class="el-icon-zoom-in" @click.stop="previewImage"></i>
      </div>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="src" alt="" />
      </el-dialog>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { handleImage } from '@customhub/utils/tools';

@Component({
  name: 'LineImage',
})
export default class LineImage extends Vue {
  @Prop({ default: true }) private isOss!: boolean; // 是否为oss图片
  @Prop({ default: false }) private showBgColor!: boolean; // 是否显示背景色
  @Prop({ default: false }) private preview!: boolean; // 是否预览
  @Prop() private src!: string; // 图片源
  @Prop() private alt!: string; // 原生 alt
  @Prop({ default: 'contain' }) private fit!: string; // 原生 object-fit
  @Prop() private referrerPolicy!: string; // 原生 referrerPolicy
  @Prop() private srcList!: unknown[]; // 开启图片预览功能
  @Prop({ default: () => [] }) private mode!: Array<string>; // oss图片裁切方式
  @Prop({ default: true }) private lazy!: boolean; // 是否开启懒加载
  @Prop({ default: 2000 }) private zIndex!: number; // 设置图片预览的 z-index
  @Prop({
    // 开启懒加载后，监听 scroll 事件的容器
    validator: (value) => ['string', 'object'].includes(typeof value),
  })
  private scrollContainer!: boolean;

  private dialogVisible = false;
  private mainColor = '';

  @Watch('src', { immediate: true }) srcChange(cur: string) {
    if (!this.showBgColor) return;
    const pattern =
      /^(http|https):\/\/(.*)(connext.net.cn)(.*).(jpg|jpeg|bmp|png|gif|webp)/;
    if (!pattern.test(cur)) return;
    fetch(handleImage(cur, ['average-hue'])).then((response) => {
      response
        .json()
        .then((res) => {
          this.mainColor = `#${res.RGB.slice(2)}`;
        })
        .catch(() => {
          console.warn('获取主色调失败');
        });
    });
  }

  // 裁切后的src
  private get currentSrc() {
    return this.isOss ? handleImage(this.src, this.mode) : this.src;
  }

  // 图片加载成功
  private load(evt: EventTarget) {
    this.$emit('load', evt);
  }

  // 图片加载失败
  private error(evt: EventTarget) {
    this.$emit('error', evt);
  }

  // 图片预览
  private previewImage() {
    this.dialogVisible = true;
  }
}
</script>

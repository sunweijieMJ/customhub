<template>
  <button
    ref="refSwitchNode"
    type="button"
    role="switch"
    :aria-checked="isChecked"
    :disabled="disabled || loading"
    :class="{
      [prefixCls]: true,
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-large`]: size === 'large',
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-checked`]: isChecked,
      [`${prefixCls}-disabled`]: disabled || loading,
    }"
    :style="[cssVars]"
    @click="handleClick"
  >
    <template v-if="loading">
      <span
        role="img"
        aria-label="loading"
        :class="`${prefixCls}-loading-icon`"
      >
        <svg
          class="anticon-spin"
          data-icon="loading"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="0 0 1024 1024"
          focusable="false"
        >
          <path
            d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
          ></path>
        </svg>
      </span>
    </template>
    <span :class="`${prefixCls}-inner`">
      <template v-if="isChecked">
        <slot name="checkedChildren">{{ checkedChildren }}</slot>
      </template>
      <template v-else>
        <slot name="unCheckedChildren">{{ unCheckedChildren }}</slot>
      </template>
    </span>
  </button>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { locale } from '@customhub/mixins';
import { t } from '@customhub/locale';

type SwitchSizes = 'small' | 'default' | 'large';
type CheckedType = boolean | string | number;

@Component({
  name: 'CustomSwitch',
  mixins: [locale],
})
export default class CustomSwitch extends Vue {
  @Prop({ default: 'custom-switch' }) private prefixCls!: string;
  @Prop({ default: 'default' }) private size!: SwitchSizes;
  @Prop({ default: false }) private disabled!: boolean;
  @Prop({ default: false }) private loading!: boolean;

  @Prop({ default: t('custom.switch.enable') })
  private checkedChildren!: string;

  @Prop({ default: t('custom.switch.disable') })
  private unCheckedChildren!: string;

  @Prop({ default: '#5755B3' }) private checkedColor!: string;
  @Prop({ default: 'rgba(0,0,0,.25)' }) private unCheckedColor!: string;
  @Prop({ default: true }) private checkedValue!: CheckedType;
  @Prop({ default: false }) private unCheckedValue!: CheckedType;
  @Prop({ default: false }) private checked!: CheckedType;

  @Watch('checked') private watchChecked() {
    this.checkedData = this.checked;
  }

  private get cssVars() {
    return {
      '--CustomSwitchCheckedColor': this.checkedColor,
      '--CustomSwitchUnCheckedColor': this.unCheckedColor,
    };
  }

  private get isChecked() {
    return this.checkedData === this.checkedValue;
  }

  private checkedData = this.checked;

  private setChecked(check: CheckedType, evt: MouseEvent | KeyboardEvent) {
    if (this.disabled) {
      return;
    }
    if (this.checked === undefined) {
      this.checkedData = check;
    }
    this.$emit('update:checked', check);
    this.$emit('change', check, evt);
  }

  private handleClick(evt: MouseEvent) {
    const newChecked = this.isChecked ? this.unCheckedValue : this.checkedValue;
    this.setChecked(newChecked, evt);
    this.$emit('click', newChecked, evt);
  }
}
</script>

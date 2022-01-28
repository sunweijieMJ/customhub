import { Vue } from 'vue-property-decorator';
import { t } from '@customhub/locale';

export default class extends Vue {
  private t(...args: any[]) {
    return t.apply(this, args);
  }
}

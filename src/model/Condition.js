import { Model } from '@nozbe/watermelondb'
import { field, readonly, date } from '@nozbe/watermelondb/decorators'

export default class Condition extends Model {
  static table = 'conditions';

  @field("cname") cname;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  getCondition() {
    return {
      cname: this.cname,
    }
  }
}
import { Model } from '@nozbe/watermelondb'
import { field, relation, readonly, date } from '@nozbe/watermelondb/decorators'

export default class ConditionStatus extends Model {
  static table = 'condition_statuses';
  static associations = {
    cases: { type: 'belongs_to', key: 'case_id' },
  };

  @field("status") status
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  @relation("conditions", "condition_id") condition;
  @relation("cases", "case_id") case;
}
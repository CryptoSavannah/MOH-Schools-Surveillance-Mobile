import { Model } from '@nozbe/watermelondb'
import { field, readonly, date, relation, children } from '@nozbe/watermelondb/decorators'

export default class Case extends Model {
    static table = 'cases';
    static associations = {
        condition_statuses: {type: "has_many", foreignKey: "case_id"}
      };
      
      @field('schoolId') schoolId;
      @field('condition_status_id') condition_status_id;
      @readonly @date('created_at') createdAt;
      @readonly @date('updated_at') updatedAt;
  
      @relation('pateints', 'patient_id') patient;
      @children('condition_statuses') condition_statuses
  }
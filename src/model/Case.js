import { Model } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'

export default class Case extends Model {
    static table = 'cases';
    static associations = {
        comments: { type: 'belongs_to', foreignKey: 'summary_id' },
      };
      @field('title') title;
      @field('body') body;
      @field('is_pinned') isPinned;
  }
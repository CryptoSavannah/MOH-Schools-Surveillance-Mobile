import { Model } from '@nozbe/watermelondb'

export default class Summary extends Model {
    static table = 'summaries'
    static associations = {
        comments: { type: 'has_many', foreignKey: 'summary_id' },
      }
  }
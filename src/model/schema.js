// model/schema.js
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'conditions',
      columns: [ //condition_id server_id
        { name: 'cname', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'patients',
      columns: [
        { name: 'nin_hash', type: 'string' },
        { name: 'nin', type: 'string' },
        { name: 'fname', type: 'string' },
        { name: 'lname', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'dob', type: 'string' },
        { name: 'is_active', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),
    tableSchema({
      name: 'cases',
      columns: [
        { name: 'schoolId', type: 'string' },
        { name: 'patient_id', type: 'string' },
        { name: 'condition_status_id', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),
    // tableSchema({
    //   name: 'summaries',
    //   columns: [
    //     { name: 'report_date', type: 'number' },
    //     { name: 'case_id', type: 'string', isIndexed: true },
    //     { name: 'created_at', type: 'number' },
    //     { name: 'updated_at', type: 'number' }
    //   ]
    // }),
    tableSchema({
      name: 'condition_statuses',
      columns: [
        { name: 'case_id', type: 'string' },
        { name: 'condition_id', type: 'string' },
        { name: 'status', type: 'string' }, //enum in js
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
      ]
    }),
  ]
})
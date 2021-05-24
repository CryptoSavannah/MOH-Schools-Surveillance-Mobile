/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './src/model/schema'
import migrations from './src/model/migrations'
// import Post from './src/model/Post' // ⬅️ You'll import your Models here
import Case from './src/model/Case'
import Patient from './src/model/Patient'
import Condition from './src/model/Condition'
import ConditionStatus from './src/model/ConditionStatus'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  dbName: 'mohdb',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true, /* Platform.OS === 'ios' */
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
    alert("Failed to load data. Log out and Login again.")
  }
})

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [Case, Patient, Condition, ConditionStatus
    // Post, // ⬅️ You'll add Models to Watermelon here
  ],
  actionsEnabled: true,
})

AppRegistry.registerComponent(appName, () => App);

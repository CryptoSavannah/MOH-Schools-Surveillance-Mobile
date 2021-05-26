import { Model } from '@nozbe/watermelondb'
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord'
import { field, readonly, date, action } from '@nozbe/watermelondb/decorators'
import { database } from '../../index'

export default class Patient extends Model {
  static table = 'patients';

  @field("nin_hash") nin_hash;
  @field("nin") nin;
  @field("fname") fname;
  @field("lname") lname;
  @field("dob") dob;
  @field("gender") gender;
  @field("is_active") isActive;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  getPatient() {
    return {
      nin_hash: body.nin_hash,
      nin: body.nin,
      fname: body.fname,
      lname: body.lname,
      dob: body.dob,
      gender: body.gender,
      isActive: body.isActive
    }
  }


  updatePatient = async updatedPatient => {
    await this.update(patient => {
      patient.nin_hash = updatedPatient.nin_hash,
      patient.nin = updatedPatient.nin,
      patient.fname = updatedPatient.fname,
      patient.lname = updatedPatient.lname,
      patient.dob = updatedPatient.dob,
      patient.gender = updatedPatient.gender,
      patient.isActive = updatedPatient.isActive
    })
  }

  async deletePatient() {
    await this.markAsDeleted();
    return await this.destroyPermanently()
  }




  // patientsCollection = database.collections.get('patients')

  // @action async observePatients() {
  //   return this.patientsCollection.query().observe();
  // }

  // @action async addPatient(body) {
  //   return await patientsCollection.create(record => {
  //     record._raw = sanitizedRaw({
  //       id: body.id,
  //       nin_hash: body.nin_hash,
  //       nin: body.nin,
  //       fname: body.fname,
  //       lname: body.lname,
  //       dob: body.dob,
  //       gender: body.gender,
  //       isActive: body.isActive
  //     })
  //     console.log("Adding new patient")
  //   })
  // }

  // @action async getPatient(patientId) {
  //   return await patientsCollection.find(patientId);
  // }

  // @action async updatePatient(body) {
  //   const patient = await patientsCollection.find(body.id);
  //   return await patient.update(thePatient => {
  //     thePatient.nin_hash = body.nin_hash,
  //       thePatient.nin = body.nin,
  //       thePatient.fname = body.fname,
  //       thePatient.lname = body.lname,
  //       thePatient.dob = body.dob,
  //       thePatient.gender = body.gender,
  //       thePatient.isActive = body.isActive
  //   })
  // }

  // @action async deletePatient(patientId) {
  //   const patient = await patientsCollection.find(patientId);
  //   await patient.markAsDeleted();
  //   return await patient.destroyPermanently()
  // }

}
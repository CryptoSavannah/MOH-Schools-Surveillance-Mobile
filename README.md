# Surveillance Mobile App

Mobile App written in React-Native and has read and write permissions to a Blockchain to record cases and retrieve case information for a specific school. The mobile application purposes to collect patient data at treatment centers in schools. 

## Setup

This project was built using expo cli (https://github.com/expo/expo-cli), Javascript, and was moved to pure react-native setting.
1. To start clone the repo, install dependencies preferrably using yarn.
2. Next, create a folder for your url variables for the various environments in the files envs/development.json, envs/staging.json and envs/production.json.
3. To set the environment for development, run the command below.
```bash
node scripts/set-environment.js development
```
4. Invoke the react native scripts in terminal to start.

## Features

### School Information
A school representative is able to log onto the app using details presented to them. The school's details are retrieved and stored on the device.

### Record details of a case.
A patient's identification details are retrieved on the device, and information pertaining health condition is recorded as described by the health worker.

### Update a patient's record with status and results of testing.
A Health worker is able to update a case record by entering the condition of the patient and the disease that is presumed to be the cause of the patient's ailment or confirmed by results of testing have been presented to them.

### Overview of cases recorded in the school.
This feature displays a list of new cases recorded; a summary of recorded cases and their outcome drilled down to disease and common symptoms that have been presumed and, or confirmed. The user can also specify the time period that the would like to review. 

## License

Copyright 2020 Cryptosavannah Limited

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
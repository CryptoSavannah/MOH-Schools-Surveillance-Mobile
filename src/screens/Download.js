import React, { useRef, useState, useCallback, useEffect } from "react";
import { Button, Image, View, Text, StyleSheet, ScrollView } from 'react-native';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import logo from '../assets/logo.png';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';

// import { writeFile, readFile } from 'react-native-fs';

const DownloadScreen = ({ navigation }) => {

    const initialState = {
        HeadTable: ['patientid', 'schoolid', 'location', 'status', 'disease'],
        DataTable: [
            ['1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b183b620', '52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d', '23', '4', '5'],
        ],
        widthArr: [400, 400, 50, 50, 50],
        // flexArr: [2, 2, 1, 1]
    }

    const initialState2 = {
        records: [
            {
                patientid: "1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b183b620",
                schoolid: "52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d",
                location: 23,
                status: "1",
                disease: "5"
            },
            {
                patientid: "1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b183b621",
                schoolid: "52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d",
                location: 94,
                status: "0",
                disease: "5"
            },
            {
                patientid: "1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b183b420",
                schoolid: "52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d",
                location: 94,
                status: "1",
                disease: "5"
            },
            {
                patientid: "1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b103b620",
                schoolid: "52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d",
                location: 94,
                status: "2",
                disease: "5"
            },
            {
                patientid: "1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b183p620",
                schoolid: "52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d",
                location: 94,
                status: "1",
                disease: "5"
            },
            {
                patientid: "1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b383b620",
                schoolid: "52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d",
                age: 94,
                status: "1",
                disease: "5"
            },
            {
                patientid: "1ff4a10e116d534498bea86f1a18de5dc5b49dfd1f006f1c10e660c3b153b620",
                schoolid: "52d7c0bab20dd6bdf4b191a40d2e00294382c9239116452ffebb5f0af7a41b2d",
                age: 94,
                status: "1",
                disease: "5"
            }
        ]
    }

    const userColumns = [
        {
            Header: "patient",
            columns: [
                {
                    Header: "patientid",
                    id: "patientid",
                    accessor: d => d.patientid
                },
                {
                    Header: "schoolid",
                    id: "schoolid",
                    accessor: d => d.schoolid
                }
            ]
        },
        {
            Header: "location",
            columns: [
                {
                    Header: "location",
                    id: "location",
                    accessor: d => d.location
                }
            ]
        },
        {
            Header: "status",
            columns: [
                {
                    Header: "status",
                    id: "status",
                    accessor: d => d.status
                }
            ]
        },
        {
            Header: "disease",
            columns: [
                {
                    Header: "disease",
                    id: "disease",
                    accessor: d => d.disease
                }
            ]
        }
    ];

    const data = [];
    for (let i = 0; i < 30; i += 1) {
        const dataRow = [];
        for (let j = 0; j < 9; j += 1) {
            dataRow.push(`${i}${j}`);
        }
        data.push(dataRow);
    }

    const exportRd = () => {
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "HSSData");
        const wbout = XLSX.write(wb, {
            type: 'base64',
            bookType: "xlsx"
        });
        const uri = FileSystem.cacheDirectory + 'HSSData.xlsx';
        console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
        (async () => {
            await FileSystem.writeAsStringAsync(uri, wbout, {
                encoding: FileSystem.EncodingType.Base64
            });        
        })();
        
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ paddingBottom: 10, color: '#888', fontSize: 18 }}>{'Pending Records:'.toUpperCase()} </Text>
                <Image source={logo} style={{ width: 40, height: 30 }} />
            </View>
            <ScrollView horizontal={true}>

                <View>
                    <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                        <Row data={initialState.HeadTable} widthArr={initialState.widthArr} style={styles.head} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderColor: '#C1C0B9' }}>
                            {
                                initialState.DataTable.map((dataRow, index) => (
                                    <Row
                                        key={index}
                                        data={dataRow}
                                        widthArr={initialState.widthArr}
                                        style={[styles.row, index % 2 && { backgroundColor: '#ffffff' }]}
                                        textStyle={styles.text}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={{ width: 100, alignSelf: "flex-end" }}>
            <Button title="Download"
              rounded
              block
              style={styles.btn}
              color="#FFB236"
              onPress={() => { exportRd() }}
            >
            </Button>
          </View>
        </View>

    )

};

export default DownloadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#ffffff'
    },
    head: {
        height: 50,
        backgroundColor: '#6F7BD9'
    },
    text: {
        textAlign: 'center',
        fontWeight: '200'
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 40,
        backgroundColor: '#F7F8FA'
    }
});
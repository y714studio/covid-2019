const firstSunday = 20200119;

const dates = [
  20200117,
  20200118,
  20200119,
  20200120,
  20200121,
  20200122,
  20200123,
  20200124,
  20200125,
  20200126,
  20200127,
  20200128,
  20200129,
  20200130,
  20200131,
  20200201,
  20200202,
  20200203,
  20200204,
  20200205,
  20200206,
  20200207,
  20200208,
  20200209,
  20200210,
  20200211,
  20200212,
  20200213,
  20200214,
  20200215,
  20200216,
  20200217,
  20200218,
  20200219,
  20200220,
  20200221,
  20200222,
  20200223
];

const cases = [
  {
    caseNo: 1,
    confirmed: 20200123,
    start: 20200121,
    gender: 'male',
    age: 39,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'imported'
  },
  {
    caseNo: 2,
    confirmed: 20200123,
    start: 20200118,
    gender: 'male',
    age: 56,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported'
  },
  {
    caseNo: 3,
    confirmed: 20200124,
    start: 20200120,
    gender: 'female',
    age: 62,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'imported'
  },
  {
    caseNo: 4,
    confirmed: 20200124,
    start: 20200123,
    gender: 'female',
    age: 62,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'imported'
  },
  {
    caseNo: 5,
    confirmed: 20200124,
    start: 20200124,
    gender: 'male',
    age: 63,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'imported'
  },
  {
    caseNo: 6,
    confirmed: 20200126,
    start: 20200121,
    gender: 'male',
    age: 47,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported'
  },
  {
    caseNo: 7,
    confirmed: 20200126,
    start: 20200121,
    gender: 'female',
    age: 68,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported'
  },
  {
    caseNo: 8,
    confirmed: 20200126,
    start: 20200125,
    gender: 'male',
    age: 64,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'imported'
  },
  {
    caseNo: 9,
    confirmed: 20200129,
    start: 20200125,
    gender: 'female',
    age: 73,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'imported'
  },
  {
    caseNo: 10,
    confirmed: 20200129,
    start: 20200125,
    gender: 'male',
    age: 72,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'imported'
  },
  {
    caseNo: 11,
    confirmed: 20200130,
    start: 20200128,
    gender: 'female',
    age: 37,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported-contact'
  },
  {
    caseNo: 12,
    confirmed: 20200130,
    start: 20200122,
    gender: 'male',
    age: 75,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible'
  },
  {
    caseNo: 13,
    confirmed: 20200131,
    start: 20200129,
    gender: 'male',
    age: 39,
    hospital: 'PMH',
    status: 'dead',
    resident: 'HKR',
    origin: 'imported'
  },
  {
    caseNo: 14,
    confirmed: 20200201,
    start: 20200123,
    gender: 'male',
    age: 80,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible'
  },
  {
    caseNo: 15,
    confirmed: 20200202,
    start: 20200201,
    gender: 'female',
    age: 72,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported-contact'
  },
  {
    caseNo: 16,
    confirmed: 20200204,
    start: 20200123,
    gender: 'female',
    age: 64,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 17,
    confirmed: 20200204,
    start: 20200122,
    gender: 'male',
    age: 60,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 18,
    confirmed: 20200204,
    start: 20200128,
    gender: 'male',
    age: 25,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 19,
    confirmed: 20200205,
    start: 20200130,
    gender: 'female',
    age: 28,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 20,
    confirmed: 20200205,
    start: 20200204,
    gender: 'female',
    age: 56,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 21,
    confirmed: 20200205,
    start: 20200130,
    gender: 'male',
    age: 56,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible'
  },
  {
    caseNo: 22,
    confirmed: 20200206,
    start: 20200201,
    gender: 'female',
    age: 55,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 23,
    confirmed: 20200206,
    start: 20200126,
    gender: 'female',
    age: 63,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 24,
    confirmed: 20200206,
    start: 20200128,
    gender: 'female',
    age: 65,
    hospital: 'PWH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 25,
    confirmed: 20200207,
    start: 20200204,
    gender: 'male',
    age: 58,
    hospital: 'NDH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported'
  },
  {
    caseNo: 26,
    confirmed: 20200207,
    start: 20200203,
    gender: 'male',
    age: 42,
    hospital: 'PWH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported'
  },
  {
    caseNo: 27,
    confirmed: 20200209,
    start: 20200130,
    gender: 'male',
    age: 24,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible'
  },
  {
    caseNo: 28,
    confirmed: 20200209,
    start: 20200130,
    gender: 'male',
    age: 70,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 29,
    confirmed: 20200209,
    start: 20200201,
    gender: 'female',
    age: 91,
    hospital: 'PYN' ,
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 30,
    confirmed: 20200209,
    start: 20200129,
    gender: 'male',
    age: 68,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 31,
    confirmed: 20200209,
    start: 20200128,
    gender: 'female',
    age: 57,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 32,
    confirmed: 20200209,
    start: 20200204,
    gender: 'male',
    age: 22,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 33,
    confirmed: 20200209,
    start: 20200202,
    gender: 'female',
    age: 50,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 34,
    confirmed: 20200209,
    start: 20200130,
    gender: 'female',
    age: 25,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 35,
    confirmed: 20200209,
    start: 20200204,
    gender: 'female',
    age: 51,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 36,
    confirmed: 20200209,
    start: 20200207,
    gender: 'male',
    age: 23,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 41,
    confirmed: 20200210,
    start: 20200208,
    gender: 'male',
    age: 52,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 37,
    confirmed: 20200210,
    start: 20200130,
    gender: 'female',
    age: 55,
    hospital: 'PWH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 42,
    confirmed: 20200210,
    start: 20200203,
    gender: 'female',
    age: 62,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 39,
    confirmed: 20200210,
    start: 20200130,
    gender: 'female',
    age: 63,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 38,
    confirmed: 20200210,
    start: 20200130,
    gender: 'male',
    age: 69,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 40,
    confirmed: 20200210,
    start: 20200128,
    gender: 'female',
    age: 86,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 48,
    confirmed: 20200211,
    start: 20200202,
    gender: 'female',
    age: 37,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 49,
    confirmed: 20200211,
    start: 20200130,
    gender: 'male',
    age: 37,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 43,
    confirmed: 20200211,
    start: 20200202,
    gender: 'male',
    age: 59,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 44,
    confirmed: 20200211,
    start: 20200201,
    gender: 'female',
    age: 60,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 47,
    confirmed: 20200211,
    start: 20200131,
    gender: 'male',
    age: 66,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 45,
    confirmed: 20200211,
    start: 20200205,
    gender: 'male',
    age: 71,
    hospital: 'TKO',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 46,
    confirmed: 20200211,
    start: 20200203,
    gender: 'male',
    age: 75,
    hospital: 'QMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 50,
    confirmed: 20200212,
    start: 20200203,
    gender: 'male',
    age:  51,
    hospital: 'QEH'   ,
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 51,
    confirmed: 20200213,
    start: 20200129,
    gender: 'male',
    age: 43,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 52,
    confirmed: 20200213,
    start: 20200131,
    gender: 'female',
    age: 67,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 53,
    confirmed: 20200213,
    start: 20200208,
    gender: 'male',
    age: 37,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 54,
    confirmed: 20200214,
    start: 20200203,
    gender: 'female',
    age: 41,
    hospital: 'RH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 55,
    confirmed: 20200214,
    start: 20200202,
    gender: 'male',
    age: 70,
    hospital: 'PMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible'
  },
  {
    caseNo: 56,
    confirmed: 20200214,
    start: 20200212,
    gender: 'female',
    age: 61,
    hospital: 'QMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 57,
    confirmed: 20200216,
    start: 20200207,
    gender: 'male',
    age: 54,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 58,
    confirmed: 20200217,
    start: 20200208,
    gender: 'male',
    age: 69,
    hospital: 'CMC',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 59,
    confirmed: 20200217,
    start: 20200212,
    gender: 'male',
    age: 45,
    hospital: 'QEH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 60,
    confirmed: 20200217,
    start: 20200208,
    gender: 'female',
    age: 46,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 61,
    confirmed: 20200218,
    start: 20200202,
    gender: 'female',
    age: 32,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'NHKR',
    origin: 'local-contact'
  },
  {
    caseNo: 62,
    confirmed: 20200218,
    start: 20200211,
    gender: 'male',
    age: 58,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'imported-contact'
  },
  {
    caseNo: 63,
    confirmed: 20200219,
    start: 20200214,
    gender: 'female',
    age: 83,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible-contact'
  },
  {
    caseNo: 64,
    confirmed: 20200219,
    start: 20200212,
    gender: 'male',
    age: 68,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 65,
    confirmed: 20200219,
    start: 20200212,
    gender: 'female',
    age: 70,
    hospital: 'PYN',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-contact'
  },
  {
    caseNo: 66,
    confirmed: 20200220,
    start: 20200125,
    gender: 'male',
    age: 75,
    hospital: 'TMH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-possible'
  },
  {
    caseNo: 67,
    confirmed: 20200220,
    start: 20200210,
    gender: 'female',
    age: 38,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 68,
    confirmed: 20200220,
    start: 20200208,
    gender: 'male',
    age: 58,
    hospital: 'NDH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  },
  {
    caseNo: 69,
    confirmed: 20200220,
    start: 20200218,
    gender: 'male',
    age: 48,
    hospital: 'UCH',
    status: 'hospitalized',
    resident: 'HKR',
    origin: 'local-unknown'
  }
];

export { firstSunday, dates, cases };

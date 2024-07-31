const getNodes = (levels) => [
  {
    id: '1',
    type: 'clean',
    data: {
      label: '정수장',
      B: 'source',
    },
    position: { x: 805, y: 0 },
  },
  {
    id: '2a',
    type: 'customR',
    data: {
      R: 'source',
    },
    position: { x: 840, y: 105 },
  },
  {
    id: '2b',
    type: 'customL',
    data: {
      L: 'source',
    },
    position: { x: 840, y: 105 },
  },
  {
    id: '2c',
    type: 'customTB',
    data: {
      T: 'target',
      B: 'source',
    },
    position: { x: 840, y: 105 },
  },
  {
    id: '3',
    type: 'quarterRL',
    data: {
      label: 'F분기',
      R: 'target',
      L: 'source'
    },
    position: { x: 675, y: 100 },
  },
  {
    id: '4',
    type: 'customRB',
    data: {
      R: 'target',
      B: 'source',
    },
    position: { x: 540, y: 105 },
  },
  {
    id: '5',
    type: 'tankT',
    data: {
      label: 'G배수지',
      T: 'target',
      amount: levels[4],
      max: 4.1
    },
    position: { x: 525, y: 175 },
  },
  {
    id: '6',
    type: 'quarterRL',
    data: {
      label: 'A분기',
      R: 'source',
      L: 'target',
    },
    position: { x: 975, y: 100 },
  },
  {
    id: '7',
    type: 'customLB',
    data: {
      B: 'source',
      L: 'target',
    },
    position: { x: 1135, y: 105 },
  },
  {
    id: '8',
    type: 'tankT',
    data: {
      label: 'A배수지',
      T: 'target',
      amount: levels[0],
      max: 3.9
    },
    position: { x: 1120, y: 175 },
  },
  {
    id: '9',
    type: 'quarterB',
    data: {
      label: 'D분기',
      B: 'source',
    },
    position: { x: 1095, y: 300 },
  },
  {
    id: '10',
    type: 'quarterTR',
    data: {
      label: 'D분기',
      R: 'source',
      T: 'target',
    },
    position: { x: 1095, y: 300 },
  },
  {
    id: '11',
    type: 'quarterTL',
    data: {
      label: 'E분기',
      L: 'source',
      T: 'target',
    },
    position: { x: 555, y: 300 },
  },
  {
    id: '12',
    type: 'quarterBR',
    data: {
      label: 'G분기',
      B: 'source',
      R: 'target',
    },
    position: { x: 390, y: 300 },
  },
  {
    id: '13',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 370, y: 420 },
  },
  {
    id: '14',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 440, y: 420 },
  },
  {
    id: '15',
    type: 'tankT',
    data: {
      label: 'E배수지',
      T: 'target',
      amount: levels[2],
      max: 4.3
    },
    position: { x: 355, y: 500 },
  },
  {
    id: '16',
    type: 'tankT',
    data: {
      label: 'F배수지',
      T: 'target',
      amount: levels[3],
      max: 4.3
    },
    position: { x: 425, y: 500 },
  },
  {
    id: '17',
    type: 'quarterB',
    data: {
      label: 'E분기',
      B: 'source',
    },
    position: { x: 555, y: 300 },
  },
  {
    id: '17a',
    type: 'quarterR',
    data: {
      label: 'E분기',
      R: 'source',
    },
    position: { x: 555, y: 300 },
  },
  {
    id: '18',
    type: 'quarterTB',
    data: {
      label: 'H분기',
      T: 'target',
      B: 'source'
    },
    position: { x: 555, y: 520 },
  },
  {
    id: '19',
    type: 'quarterBL',
    data: {
      label: 'I분기',
      L: 'target',
      B: 'source'
    },
    position: { x: 720, y: 300 },
  },
  {
    id: '20',
    type: 'customTB',
    data: {
      T: 'target',
      B: 'source',
    },
    position: { x: 735, y: 380 },
  },
  {
    id: '21',
    type: 'tankT',
    data: {
      label: 'D배수지',
      T: 'target',
    },
    position: { x: 720, y: 500 },
  },
  {
    id: '22',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 285, y: 800 },
  },
  {
    id: '23',
    type: 'tankT',
    data: {
      label: 'H배수지',
      T: 'target',
      amount: levels[5],
      max: 5.5
    },
    position: { x: 270, y: 900 },
  },
  {
    id: '24',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 355, y: 800 },
  },
  {
    id: '25',
    type: 'tankT',
    data: {
      label: 'I배수지',
      T: 'target',
      amount: levels[6],
      max: 5.3
    },
    position: { x: 340, y: 900 },
  },
  {
    id: '26',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 425, y: 800 },
  },
  {
    id: '27',
    type: 'tankT',
    data: {
      label: 'J배수지',
      T: 'target',
      amount: levels[7],
      max: 4.2
    },
    position: { x: 410, y: 900 },
  },
  {
    id: '28',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 495, y: 800 },
  },
  {
    id: '29',
    type: 'tankT',
    data: {
      label: 'K배수지',
      T: 'target',
    },
    position: { x: 480, y: 900 },
  },
  {
    id: '30',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 565, y: 800 },
  },
  {
    id: '31',
    type: 'tankT',
    data: {
      label: 'L배수지',
      T: 'target',
      amount: levels[8],
      max: 4.2
    },
    position: { x: 550, y: 900 },
  },
  {
    id: '32',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 635, y: 800 },
  },
  {
    id: '33',
    type: 'tankT',
    data: {
      label: 'M배수지',
      T: 'target',
      amount: levels[9],
      max: 3.8
    },
    position: { x: 620, y: 900 },
  },
  {
    id: '34',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 705, y: 800 },
  },
  {
    id: '35',
    type: 'tankT',
    data: {
      label: 'N배수지',
      T: 'target',
      amount: levels[10],
      max: 3.95
    },
    position: { x: 690, y: 900 },
  },
  {
    id: '36',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 775, y: 800 },
  },
  {
    id: '37',
    type: 'tankT',
    data: {
      label: 'O배수지',
      T: 'target',
      amount: levels[11],
      max: 6.3
    },
    position: { x: 760, y: 900 },
  },
  {
    id: '38',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 845, y: 800 },
  },
  {
    id: '39',
    type: 'tankT',
    data: {
      label: 'S배수지',
      T: 'target',
      amount: levels[14],
      max: 9.6
    },
    position: { x: 830, y: 900 },
  },
  {
    id: '40',
    type: 'quarterBL',
    data: {
      label: 'B분기',
      L: 'target',
      B: 'source',
    },
    position: { x: 1270, y: 300 },
  },
  {
    id: '41',
    type: 'customTB',
    data: {
      T: 'target',
      B: 'source',
    },
    position: { x: 1250, y: 380 },
  },
  {
    id: '42',
    type: 'customTB',
    data: {
      T: 'target',
      B: 'source',
    },
    position: { x: 1320, y: 380 },
  },
  {
    id: '43',
    type: 'tankT',
    data: {
      label: 'B배수지',
      T: 'target',
      amount: levels[1],
      max: 5
    },
    position: { x: 1235, y: 500 },
  },
  {
    id: '44',
    type: 'tankT',
    data: {
      label: 'C배수지',
      T: 'target',
    },
    position: { x: 1305, y: 500 },
  },
  {
    id: '45',
    type: 'quarterTB',
    data: {
      label: 'C분기',
      B: 'source',
      T: 'target',
    },
    position: { x: 1095, y: 500 },
  },
  {
    id: '47',
    type: 'quarterL',
    data: {
      label: 'C분기',
      L: 'source',
    },
    position: { x: 1095, y: 500 },
  },
  {
    id: '48',
    type: 'quarterL',
    data: {
      label: 'J분기',
      L: 'source',
    },
    position: { x: 965, y: 500 },
  },
  {
    id: '49',
    type: 'quarterR',
    data: {
      label: 'J분기',
      R: 'target',
    },
    position: { x: 965, y: 500 },
  },
  {
    id: '50',
    type: 'quarterB',
    data: {
      label: 'J분기',
      B: 'source',
    },
    position: { x: 965, y: 500 },
  },
  {
    id: '51',
    type: 'customRB',
    data: {
      B: 'source',
      R: 'target',
    },
    position: { x: 860, y: 505 },
  },
  {
    id: '52',
    type: 'tankT',
    data: {
      label: 'R배수지',
      T: 'target',

    },
    position: { x: 845, y: 630 },
  },
  {
    id: '53',
    type: 'quarterTB',
    data: {
      label: 'L분기',
      T: 'target',
      B: 'source',
    },
    position: { x: 965, y: 650 },
  },
  {
    id: '54',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 980, y: 800 },
  },
  {
    id: '55',
    type: 'tankT',
    data: {
      label: 'Q배수지',
      T: 'target',
      amount: levels[13],
      max: 5
    },
    position: { x: 965, y: 900 },
  },
  {
    id: '56',
    type: 'quarterTB',
    data: {
      label: 'K분기',
      B: 'source',
      T: 'target',
    },
    position: { x: 1095, y: 650 },
  },
  {
    id: '57',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 1075, y: 800 },
  },
  {
    id: '58',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 1145, y: 800 },
  },
  {
    id: '59',
    type: 'tankT',
    data: {
      label: 'P배수지',
      T: 'target',
      amount: levels[12],
      max: 4.4
    },
    position: { x: 1060, y: 900 },
  },
  {
    id: '60',
    type: 'tankT',
    data: {
      label: 'T배수지',
      T: 'target',
      amount: levels[15],
      max: 5.4
    },
    position: { x: 1130, y: 900 },
  },
  {
    id: '61',
    type: 'quarterBL',
    data: {
      label: 'M분기',
      B: 'source',
      L: 'target',
    },
    position: { x: 1355, y: 600 },
  },
  {
    id: '62',
    type: 'quarterTB',
    data: {
      label: 'N분기',
      B: 'source',
      T: 'target',
    },
    position: { x: 1260, y: 700 },
  },
  {
    id: '63',
    type: 'quarterTB',
    data: {
      label: 'O분기',
      B: 'source',
      T: 'target',
    },
    position: { x: 1450, y: 700 },
  },
  {
    id: '64',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 1275, y: 800 },
  },
  {
    id: '65',
    type: 'tankT',
    data: {
      label: 'U배수지',
      T: 'target',
      amount: levels[16],
      max: 4.2
    },
    position: { x: 1260, y: 900 },
  },
  {
    id: '66',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 1370, y: 800 },
  },
  {
    id: '67',
    type: 'tankT',
    data: {
      label: 'V배수지',
      T: 'target',
      amount: levels[17],
      max: 5.3
    },
    position: { x: 1355, y: 900 },
  },
  {
    id: '68',
    type: 'customTB',
    data: {
      B: 'source',
      T: 'target',
    },
    position: { x: 1465, y: 800 },
  },
  {
    id: '69',
    type: 'tankT',
    data: {
      label: 'W배수지',
      T: 'target',
    },
    position: { x: 1450, y: 900 },
  },
];
export default getNodes;

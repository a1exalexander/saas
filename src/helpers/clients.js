const clients = [
  {
    id: 46,
    name_first: 'Dollie',
    name_last: 'Reeves',
    name: 'Dollie Reeves',
    email: 'ju@wivwoz.mu',
    photo: null,
    phone: '991040772',
    company: 'EeFlU',
    city: 'London',
    country: 'Vanuatu',
    balance: 18619.2750,
    age: 38,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Lillian Park',
    tokens: 1201.10460,
    last_seen: '2/20/2100',
    created: '1/4/2117',
  },
  {
    id: 45,
    name_first: 'Anthony',
    name_last: 'Sullivan',
    name: 'Bessie Sullivan',
    email: 'dawop@jizomov.id',
    photo: null,
    phone: '991040772',
    company: 'St. Barthélemy',
    city: 'London',
    country: 'Poland',
    balance: 18619.2750,
    age: 41,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Eddie Martinez',
    tokens: 1201.10460,
    last_seen: '9/2/2020',
    created: '4/7/2065',
  },
  {
    id: 2,
    name_first: 'Jeremiah',
    name_last: 'Wood',
    name: 'Jeremiah Wood',
    email: 'wohaw@zusres.ki',
    photo: null,
    phone: '991040772',
    company: 'India',
    city: 'London',
    country: 'Singapore',
    balance: 18619.2750,
    age: 42,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Luella Dunn',
    tokens: 1201.10460,
    last_seen: '1/25/2031',
    created: '5/23/2037',
  },
  {
    id: 83,
    name_first: 'Nicholas',
    name_last: 'Edwards',
    name: 'Nicholas Edwards',
    email: 'wosu@gufnec.cu',
    photo: null,
    phone: '991040772',
    company: 'Lebanon',
    city: 'London',
    country: 'Slovenia',
    balance: 18619.2750,
    age: 41,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'John Peterson',
    tokens: 1201.10460,
    last_seen: '10/2/2084',
    created: '5/29/2039',
  },
  {
    id: 60,
    name_first: 'Julian',
    name_last: 'McCarthy',
    name: 'Julian McCarthy',
    email: 'tadlogpuk@petmu.tr',
    photo: null,
    phone: '991040772',
    company: 'Diego Garcia',
    city: 'London',
    country: 'Cameroon',
    balance: 18619.2750,
    age: 42,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Bruce Colon',
    tokens: 1201.10460,
    last_seen: '2/22/2030',
    created: '4/5/2084',
  },
  {
    id: 35,
    name_first: 'Zachary',
    name_last: 'Morrison',
    name: 'Zachary Morrison',
    email: 'bolru@rone.bg',
    photo: null,
    phone: '991040772',
    company: 'New Zealand',
    city: 'London',
    country: 'Czech Republic',
    balance: 18619.2750,
    age: 29,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Sally Henderson',
    tokens: 1201.10460,
    last_seen: '8/1/2093',
    created: '10/24/2062',
  },
  {
    id: 44,
    name_first: 'Luella',
    name_last: 'Richardson',
    name: 'Luella Richardson',
    email: 'gutujeru@bicouw.sa',
    photo: null,
    phone: '991040772',
    company: 'St. Barthélemy',
    city: 'London',
    country: 'Nicaragua',
    balance: 18619.2750,
    age: 26,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Myrtie Moreno',
    tokens: 1201.10460,
    last_seen: '1/11/2059',
    created: '2/27/2042',
  },
  {
    id: 50,
    name_first: 'Luke',
    name_last: 'Underwood',
    name: 'Luke Underwood',
    email: 'zuj@lipfone.gd',
    photo: null,
    phone: '991040772',
    company: 'Senegal',
    city: 'London',
    country: 'Tajikistan',
    balance: 18619.2750,
    age: 35,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Russell Hoffman',
    tokens: 1201.10460,
    last_seen: '12/25/2096',
    created: '3/28/2081',
  },
  {
    id: 66,
    name_first: 'Lenora',
    name_last: 'Reed',
    name: 'Lenora Reed',
    email: 'ib@zajpoar.rs',
    photo: null,
    phone: '991040772',
    company: 'Iran',
    city: 'London',
    country: 'Madagascar',
    balance: 18619.2750,
    age: 31,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Myra Bishop',
    tokens: 1201.10460,
    last_seen: '10/19/2101',
    created: '11/28/2082',
  },
];

const client = (id) => {
  return {
    id,
    name_first: 'Lenora',
    name_last: 'Reed',
    name: 'Lenora Reed',
    email: 'ib@zajpoar.rs',
    photo: null,
    phone: '991040772',
    company: 'Iran',
    city: 'London',
    country: 'Madagascar',
    balance: 18619.2750,
    age: 31,
    role: 'investor',
    sphere: 'IT',
    online: true,
    position: 'menager',
    status: true,
    manager: 'Myra Bishop',
    tokens: 1201.10460,
    last_seen: '10/19/2101',
    created: '11/28/2082',
  }
}

export { clients, client };
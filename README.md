App for managing crypto assets include find investments, create a portfolio and trade. This app developed using the javascript framework Vue.js. For styling, I used the SASS (SCSS syntax) preprocessor and the BEM methodology. All components was created without using of third-party libraries. I created custom components library based on designers artboard and frontend logic. For operation with currencies data i used Decimal.js and Lodash libraries. I used Axios as an API wrapper over Vuex to connect to the backend. I also thought over the architecture of the application and completely divided the JS logic to put it into the corresponding services, utilities and plugins.

[Demo](https://a1exalexander.github.io/saas)

General dependences:
+ [Vue](https://vuejs.org/)
+ [Vuex](https://vuex.vuejs.org)
+ [Vue-router](https://router.vuejs.org)
+ [axios](https://github.com/axios/axios)
+ [Apexcharts](https://apexcharts.com)
+ [Sortable](https://github.com/SortableJS/Sortable)

Secondary dependencies:
+ [Moment.js](https://momentjs.com)
+ [GSAP](https://greensock.com/gsap)
+ [Velocity.js](http://velocityjs.org/)
+ [Numeral.js](http://numeraljs.com/)
+ [QRcode-components](https://gerardreches.github.io/vue-qrcode-component/)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

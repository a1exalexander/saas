
const ORDER_TEMPLATE = {
  type: '', // marker, limit, stop-limit, shadow
  direction: '', // buy/sell
  pair: 'ETH', // ETH/BTC
  exchange: '', // Binance, etc ...
  price: 0,
  amount: 0,
  stop: 0,
  baseAsset: '',
  quoteAsset: '',
  total: 0, // optional
}

const state = {
  currentExchange: 'Bittrex',
  currentPair: 'ETH/BTC',
  bestBuyPrice: 0,
  bestSellPrice: 0,

  baseAsset: '', // ETH
  quoteAsset: '', // BTC

  baseAssetBalance: 0,
  quoteAssetBalance: 0,

  allBalances:{
    meta: {},
    coins:[],
  },
  allTradeHistory:[],
  orderBook:{
    asks: [],
    bids: [],
  },
  tradingPairs:{},

  orderTemplate:{
    ...ORDER_TEMPLATE
  },

  openOrders: [],
  wishLists: [],
  priceAlerts: [],

  tradingViewOptions: {
    // width: 750,
    // height: 330,
    symbol: 'BTCUSDT',
    interval: '60',
    timezone: 'Europa/Brussel',
    style: '1',
    locale: 'en',
    // autosize: true,
    toolbar_bg: '#f1f3f6',
    theme: 'Dark',
    debug: false,
    width: '100%',
    height: '370px',
    // preset: "mobile",
  },
};

const mutations = {

  clearOrderBook( state ){
    state.orderBook.asks = [];
    state.orderBook.bids = [];
  },

  clearAllBalances( state ){
    state.allBalances.meta = {};
    state.allBalances.coins = [];
  },

  clearTradingPairs( state ){
    state.tradingPairs = {};
  },

  clearBalanceCurrentOfPair( state ){
    state.baseAssetBalance = 0;
    state.quoteAssetBalance = 0;
  },

  setOpenOrders( state, orders ){
    state.openOrders = orders;
  },

  setOrderBook( state, orderBook ){
    state.orderBook = orderBook;
    try{
      state.bestBuyPrice = state.orderBook.asks[ state.orderBook.asks.length -1 ].price;
      state.bestSellPrice = state.orderBook.asks[0].price;
    }catch(e){ }

  },
  setBalanceFromAllExchanges(state, balances){
    state.allBalances = balances;
  },
  setTradeHistoryFromAllExchanges( state, allHistory ){
    state.allTradeHistory = allHistory;
  },

  setTradingPairs( state, pairs ){
    state.tradingPairs = pairs;
  },
  setCurrentPair( state, pair ){
    state.currentPair = pair;
    state.tradingViewOptions.symbol = pair;
    state.baseAsset = state.tradingPairs[ pair ].baseAsset;
    state.quoteAsset = state.tradingPairs[ pair ].quoteAsset

    // orderTemplate
    state.orderTemplate.pair = pair; 
    state.orderTemplate.exchange = state.currentExchange;
    state.orderTemplate.baseAsset = state.baseAsset;
    state.orderTemplate.quoteAsset = state.quoteAsset

    // state.tradingPairs[ "ETH/BTC" ] => {
    //   "id": 1,
    //   "price": 0.032864,
    //   "change24h": 0.47,
    //   "pair": "ETH/BTC",
    //   "baseAsset": "BTC",
    //   "quoteAsset": "ETH",
    //   "baseAssetPrecision": 0,
    //   "quoteAssetPrecision": 0,
    //   "status": true
    // },

  },
  setCurrentExchange( state, exchange ){
    state.currentExchange = exchange;
    state.orderTemplate.exchange = state.currentExchange;

  },

  updateOrderTemplateItem(state, Obj){
    Object.keys(Obj).map((key)=>{
      state.orderTemplate[ key ] = Obj[ key ];
    });
  },

  setBalanceCurrentOfPair( state, infoObject ){

    // infoObject
    // {"baseAsset":"BTC","quoteAsset":"GRIN","baseAssetBalance":0.00004969,"quoteAssetBalance":0}
    state.baseAssetBalance = (+infoObject.baseAssetBalance);
    state.quoteAssetBalance = (+infoObject.quoteAssetBalance);

  },

  setOrderDirection( state, direction ){
    state.orderTemplate.direction = (''+direction).toLowerCase().trim();
  },
  resetOrderTemplate(state){
    state.orderTemplate = { ...ORDER_TEMPLATE };
  },

  setWishLists( state, data){
    state.wishLists = data;
  },

  setPriceAlerts( state, data){
    state.priceAlerts = data;
  },

  updateStars(state){
    for( let wishListsItem of state.wishLists ){
      if( state.tradingPairs[ wishListsItem.pair ] ){
        state.tradingPairs[ wishListsItem.pair ].isInWishList = true; // glowing star in UI
        state.tradingPairs[ wishListsItem.pair ].wishListId = wishListsItem.id;
      }
    }
  },

};

const getters = {

};

const actions = {

  downloadOpenOrders({ commit, rootGetters }) {

  },
  downloadOrderBook({ commit, rootGetters }) {
  
  },
  downloadBalanceFromAllExchanges({ commit, rootGetters }) {
  
  },
  downloadTradeHistoryFromAllExchanges({ commit, rootGetters }) {

  },
  downloadTradingPairs({ commit, dispatch, rootGetters }){

  },
  getBalanceCurrentOfPair({ commit, dispatch, rootGetters }){

  },
  setTradingPairs({ commit, dispatch, rootGetters }, pairs ){
    commit('setTradingPairs', pairs );
  },
  setCurrentPair({ commit, dispatch, rootGetters }, pair ){
    commit('setCurrentPair',pair);
    dispatch('downloadOrderBook');
    dispatch('getBalanceCurrentOfPair');
  },
  setCurrentExchange({ commit, dispatch, rootGetters }, exchange ){
    commit('setCurrentExchange',exchange);
    dispatch('downloadTradingPairs');

  },

  updateOrderTemplateItem({commit}, Obj ){
    commit('updateOrderTemplateItem', Obj);

  },

  resetOrderTemplate({commit}){
    commit('resetOrderTemplate');
  },
  createOrder({ commit, dispatch, rootState, rootGetters }) {
    dispatch('downloadOrderBook');
    dispatch('getBalanceCurrentOfPair');
    dispatch('downloadTradeHistoryFromAllExchanges'); // <<< Cached
    dispatch('downloadOpenOrders');
    dispatch('messages/showSuccessMessage', null, {root: true});
  },
  wishListsGetAll({ commit, dispatch, rootState, rootGetters }){
    commit('updateStars');
  },
  wishListsAdd({ commit, dispatch, rootState, rootGetters }, obj){
    dispatch('messages/showSuccessMessage', null, {root: true});
  },
  wishListsRemove({ commit, dispatch, rootState, rootGetters }, obj) {
    dispatch('wishListsGetAll');
  },
  priceAlertsGetAll({ commit, dispatch, rootState, rootGetters }) {

  },
  priceAlertsAdd({ commit, dispatch, rootState, rootGetters }, obj) {
    dispatch('messages/showSuccessMessage', null, {root: true});
  },
  priceAlertsRemove({ commit, dispatch, rootState, rootGetters }, obj) {
    dispatch('priceAlertsGetAll');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

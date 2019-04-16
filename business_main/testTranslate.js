const translate = require("translate");
  const bar = translate('Home,shop,shopping cart,blog,cart', { to: 'vi', engine: 'google', key: 'AIzaSyA9oA2ivdWXD9aMEGdKLMIPFv3A_Vff2Ms' })
  .then(result => {
    console.log("GET TRANSLATE!");
    console.log(result);
  });
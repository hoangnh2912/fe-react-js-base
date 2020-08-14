let _history;
const getHistory = () => _history;
module.exports = {
  navigation: (route) => {
    getHistory().push(route);
  },
  goBack: () => {
    getHistory().goBack();
  },
};

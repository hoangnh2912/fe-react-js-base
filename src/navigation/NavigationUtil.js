let _history;
const getHistory = () => _history;
module.exports = {
  setHistory: (ref) => {
    _history = ref.history;
  },
  navigation: (route) => {
    getHistory().push(route);
  },
  goBack: () => {
    getHistory().goBack();
  },
};

export default {
    state: {
        user: localStorage().getItem('user'),
        token: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
        },
    actions: {},
    getters: {
        isLoggedIn(state) {
            return state.token;
        },
        user(state){
            return state.user
        },
        token(state){
            return state.token
        }
    },
}
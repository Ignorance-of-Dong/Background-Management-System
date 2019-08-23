

const defaultState = {
    rankList: []
}
const RankReducer = (state = defaultState, action) => {
    const { type, layload } = action;
    switch (type) {
        case "UPDATE":
            return { ...state, rankList: layload }
        default:
            return state;
    }
}
export default RankReducer;

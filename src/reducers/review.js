import C from '../constants';

const initialState = {
    list: {},
    visibleListIds: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case C.ADD_REVIEW : 
            return {
                list: {
                    ...state.list,
                    [action.payload.id]: action.payload
                },
                visibleListIds: [
                    ...state.visibleListIds,
                    action.payload.id
                ]
            }
        case C.EDIT_REVIEW :
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: {
                        ...state.list[action.payload.id],
                        ...action.payload.review
                    }
                }
            }
        case C.DELETE_REVIEW :
            return {
                ...state,
                visibleListIds: state.visibleListIds.filter(id => id !== action.payload)
            }
        case C.ADD_STARS :
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: {
                        ...state.list[action.payload.id],
                        stars: action.payload.stars
                    }
                }
            }
        case C.ADD_REPLY :
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.id]: {
                        ...state.list[action.payload.id],
                        children: [
                            ...state.list[action.payload.id].children,
                            action.payload.reply.id
                        ]
                    },
                    [action.payload.reply.id]: action.payload.reply
                }
            }
        case C.TOGGLE_EDITING :
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload] : {
                        ...state.list[action.payload],
                        editing: !state.list[action.payload].editing,
                        replying: false
                    }
                }
            }
        case C.TOGGLE_REPLYING :
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload] : {
                        ...state.list[action.payload],
                        replying: !state.list[action.payload].replying,
                        editing: false
                    }
                }
            }
        case C.FETCH_DATA :
            return {
                list: action.payload.entities.reviews,
                visibleListIds: action.payload.result
            }
        default:
            return state
    }
}
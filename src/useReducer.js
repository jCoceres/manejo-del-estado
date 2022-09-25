import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma"

const reducerObject = (state, payload) => ({
    [actionType.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionType.check]: {
        ...state,
        loading: true,
    },
    [actionType.confirm]: {
        ...state,
        loading: false,
        confirmed: true,
    },
    [actionType.delete]: {
        ...state,
        deleted: true,
    },
    [actionType.write]: {
        ...state,
        value: payload,
    },
    [actionType.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    }
})
const reducer = (state, action) => {

    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }

}
const initialState = {
    value: "paradigma",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};
const actionType = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    check: 'CHECK',
    confirm: 'CONFORM',
    delete: 'DELETE',
    write: 'WRITE',
    reset: 'RESET'
}

export const UseReducer = ({ name }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const { value, error, loading, deleted, confirmed } = state;

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                if (value === SECURITY_CODE) {
                    dispatch({ type: actionType.confirm })
                } else {
                    dispatch({ type: actionType.error })
                }
            }, 1000);
        }
    }, [loading]);

    if (!deleted && !confirmed) {
        return (
            <div>
                <h1>Eliminar {name}</h1>
                <p>Por favor, escribe el código de seguridad.</p>
                {(error && !loading) && <p>Error: El código es incorrecto</p>}
                {loading && <p>Cargando...</p>}
                <input
                    placeholder="Código de seguridad"
                    value={value}
                    onChange={(event) => {
                        dispatch({ type: actionType.write, payload: event.target.value });
                    }}
                />
                <button
                    onClick={() =>
                        dispatch({ type: actionType.check })
                    }

                >
                    Comprobar
                </button>
            </div>
        );
    } else if (confirmed && !deleted) {
        return (
            <>
                <p>¿seguro que quieres eliminar UseState?</p>
                <button
                    onClick={() =>
                        dispatch({ type: actionType.delete })
                    }
                >
                    si, eliminar
                </button>
                <button
                    onClick={() =>
                        dispatch({ type: actionType.reset })
                    }
                >
                    No, me arrepenti
                </button>
            </>
        );
    } else {
        return (
            <>
                <h2>eliminado con exito </h2>
                <button
                    onClick={() =>
                        dispatch({ type: actionType.reset })
                    }
                >
                    Recuperar UseState
                </button>
            </>
        );
    }
};






























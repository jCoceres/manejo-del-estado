import React, { useEffect, useReducer } from "react";

const SECURITY_CODE = "paradigma"

const reducerObject = (state, payload) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'CONFIRM': {
        ...state,
        loading: false,
        confirmed: true,
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'WRITE': {
        ...state,
        value: payload,
    },
    'RESET': {
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

export const UseReducer = ({ name }) => {
    const initialState = {
        value: "paradigma",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const { value, error, loading, deleted, confirmed } = state;

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                if (value === SECURITY_CODE) {
                    dispatch({ type: 'CONFIRM' })
                } else {
                    dispatch({ type: 'ERROR' })
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
                        dispatch({ type: 'WRITE', payload: event.target.value });
                    }}
                />
                <button
                    onClick={() =>
                        dispatch({ type: 'CHECK' })
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
                        dispatch({ type: 'DELETE' })
                    }
                >
                    si, eliminar
                </button>
                <button
                    onClick={() =>
                        dispatch({ type: 'RESET' })
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
                        dispatch({ type: 'RESET' })
                    }
                >
                    Recuperar UseState
                </button>
            </>
        );
    }
};






























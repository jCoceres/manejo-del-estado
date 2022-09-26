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
    confirmed: false,
    deleted: false,
    error: false,
    loading: false,
    value: "paradigma",
};
const actionType = {
    check: 'CHECK',
    confirm: 'CONFIRM',
    delete: 'DELETE',
    error: 'ERROR',
    reset: 'RESET',
    write: 'WRITE',
}

export const UseReducer = ({ name }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const { value, error, loading, deleted, confirmed } = state;

    const onCheck = () => dispatch({ type: actionType.check });
    const onConfirm = () => dispatch({ type: actionType.confirm });
    const onDelete = () => dispatch({ type: actionType.delete });
    const onError = () => dispatch({ type: actionType.error });
    const onReset = () => dispatch({ type: actionType.reset });
    const onWrite = ({ target: { value } }) => {
        dispatch({ type: actionType.write, payload: value });
    };

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                if (value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
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
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}

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
                    onClick={onDelete}
                >
                    si, eliminar
                </button>
                <button
                    onClick={onReset}
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
                    onClick={onReset}
                >
                    Recuperar UseState
                </button>
            </>
        );
    }
};






























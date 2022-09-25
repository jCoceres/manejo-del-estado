import React, { useEffect, useState } from "react";
const SECURITY_CODE = "paradigma"
export const UseState = ({ name }) => {

    const [state, setState] = useState({
        value: "",
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });
    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            confirmed: true,
        });
    }
    const onError = () => {
        setState({
            ...state,
            loading: false,
            error: true,
        });
    }
    const onCheck = () => {
        setState({
            ...state,
            loading: true,
        });
    }
    const onDelete = () => {
        setState({
            ...state,
            deleted: true,
        })
    };
    const onWrite = (newValue) => {
        setState({
            ...state,
            value: newValue,
        })
    };
    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        })
    };

    useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 1000);
        }
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h1>Eliminar {name}</h1>
                <p>Por favor, escribe el código de seguridad.</p>
                {(state.error && !state.loading) && <p>Error: El código es incorrecto</p>}
                {state.loading && <p>Cargando...</p>}
                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        onWrite(event.target.value)
                    }}
                />
                <button
                    onClick={onCheck}
                >
                    Comprobar
                </button>
            </div>
        );
    } else if (state.confirmed && !state.deleted) {
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
                    onClick={() => {
                        onReset();
                    }}
                >
                    Recuperar UseState
                </button>
            </>
        );
    }
};

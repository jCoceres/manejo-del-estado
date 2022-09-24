import React, { useEffect, useState } from "react";
const SECURITY_CODE = "PARADIGMA"
export const UseState = ({ name }) => {
    const [state, setState] = useState({
        value: "",
        error: false,
        loading: false,
    });
    useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE)
                    setState({
                        ...state,
                        loading: false,
                        error: true,
                    });
            }, 1000);
        }
    }, [state.loading]);
    const onLoading = () => {
        setState({
            ...state,
            error: false,
            loading: true,
        });
    };

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>
            {state.error && <p>Error: El código es incorrecto</p>}
            {(state.loading && !state.error) && <p>Cargando...</p>}
            <input
                placeholder="Código de seguridad"
                value={state.value}
                onChange={({ target }) => {
                    setState({
                        ...state,
                        value: target.value,
                    })
                }}
            />
            <button onClick={onLoading}>Comprobar</button>
        </div>
    );
};

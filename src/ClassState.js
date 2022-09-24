import React from "react";
import Loading from "./Loading";

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
        };
    }

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                this.setState({ loading: false, error: true });
            }, 1000);
        }
    }
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {this.state.error && <p>Error: El código es incorrecto</p>}
                {this.state.loading && <Loading />}
                <input
                    placeholder="Código de seguridad"
                />
                <button
                    onClick={() =>
                        this.setState({ loading: true, error: false })
                    }
                >
                    Comprobar
                </button>
            </div>
        );
    }
}
export default ClassState;

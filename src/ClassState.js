import React from "react";
import Loading from "./Loading";
const SECURITY_CODE = "paradigma"
class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            value: ""
        };
    }

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                if (this.state.value === SECURITY_CODE) {
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false, error: true });
                }

            }, 1000);
        }
    }
    render() {
        return (
            <div>
                <h1>Eliminar {this.props.name}</h1>
                <p>Por favor, escribe el código de seguridad.</p>
                {(this.state.error && !this.state.loading) && <p>Error: El código es incorrecto</p>}
                {this.state.loading && <Loading />}
                <input
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={({ target }) => {
                        this.setState({ value: target.value })
                    }}
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

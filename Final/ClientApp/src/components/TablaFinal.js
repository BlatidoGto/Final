import { Button, Table } from "reactstrap"

const TablaFinal = ({ data, setEditar, mostrarModal, setMostrarModal }) => {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!mostrarModal)
    }

    return (

        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="5">Sin registros</td>
                        </tr>
                    ) : (
                        data.map(item => (
                            <tr key={item.idContacto}>
                                <td>{item.nombre}</td>
                                <td>{item.apellidos}</td>
                                <td>{item.correo}</td>
                                <td>{item.telefono}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2" onClick={() => enviarDatos(item)}>Editar</Button>
                                    <Button color="danger" size="sm">Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>
    )
}

export default TablaFinal;
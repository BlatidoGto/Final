import { useEffect, useState } from "react"
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"
import ModalFinal from "./components/ModalFinal"
import TablaFinal from "./components/TablaFinal"

const App = () => {

    const [finales, setFinales] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)

    const mostrarFinales = async () => {

        const response = await fetch("api/final/Lista");

        if (response.ok) {
            const data = await response.json();
            setFinales(data)
        } else {
            console.log("Error en los datos de la lista")
        }

    }

    useEffect(() => {
        mostrarFinales()
    }, [])

    const guardarFinal = async (final) => {

        const response = await fetch("api/final/Guardar", {

            method: 'POST',
            headers: {
                'Content-Type': 'application / json;charset=utf-8 '
            },
            body: JSON.stringify(final
            )
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarFinales();
        }

    }

    const editarFinal = async (final) => {

        const response = await fetch("api/final/Editar", {

            method: 'PUT',
            headers: {
                'Content-Type': 'application / json;charset=utf-8 '
            },
            body: JSON.stringify(final)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarFinales();
        }

    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Contactos para el Final</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Contacto Nuevo</Button>
                            <hr></hr>
                            <TablaContacto data={finales}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarFinal={guardarFinal}
                editar={editar}
                setEditar={setEditar}
                editarFinal={editarFinal}
            />
        </Container>

    )
}

export default App;
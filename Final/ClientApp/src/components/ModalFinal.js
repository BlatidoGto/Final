import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap"
import { useState } from "react"

const modeloFinal = {
    idF: 0,
    nombre: "",
    apellido: "",
    telefono: "",
    correo: ""
}

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarFinal, editar, setEditar, editarFinal }) => {

    const [final, setfinal] = useState(modeloFinal);

    const actualizaDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setContacto(
            {
                ...final,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (final.idF == 0) {
            guardarContacto(final)
        }
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                 Contacto Nuevo
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizaDato(e)} value={final.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Apellidos</Label>
                        <Input name="apellidos" onChange={(e) => actualizaDato(e)} value={final.apellido} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizaDato(e)} value={final.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizaDato(e)} value={final.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="danger" size="sm" onClick={() => setMostrarModal(!mostrarModal)}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )

}

export default ModalFinal;
import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";

const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const [nombre, setNombre] = useState('')
    const [ListaTipos, setListaTipos] = useState([]);
    const [ListaHabilidades, setListaHabilidades] = useState([]);
    const [ListaPokemones, setListaPokemones] = useState([]);
    const [allStats, setAllStats] = useState({
        numero: '',
        nombre: '',
        descripcion: '',
        tipoUno: '',
        tipoDos: '',
        habilidadUno: '',
        habilidadDos: '',
        habilidadTres: '',
        lvlEvolucion: '',
        evPrevia: '',
        evSiguiente: '',
        hp: '',
        ataque: '',
        defensa: '',
        spAtaque: '',
        spDefensa: '',
        velocidad: ''
    });
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        getOptions();
        if (!id) return;
        getPokemonById();
    }, [id])

    const getOptions = () => {
        axios.get('http://localhost:3000/tipo')
            .then(res => {
                setListaTipos(res.data);
            }).catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:3000/habilidad')
            .then(res => {
                setListaHabilidades(res.data);
            }).catch(error => {
                console.log(error);
            });
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                setListaPokemones(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
            .then(res => {
                const pokemon = res.data;
                setAllStats({
                    numero: pokemon.numero,
                    nombre: pokemon.nombre,
                    descripcion: pokemon.descripcion,
                    tipoUno: pokemon.tipoUno,
                    tipoDos: pokemon.tipoDos,
                    habilidadUno: pokemon.habilidadUno,
                    habilidadDos: pokemon.habilidadDos,
                    habilidadTres: pokemon.habilidadTres,
                    lvlEvolucion: pokemon.lvlEvolucion,
                    evolucionPrevia: pokemon.evolucionPrevia,
                    evolucionPosterior: pokemon.evolucionPosterior,
                    hp: pokemon.hp,
                    ataque: pokemon.ataque,
                    defensa: pokemon.defensa,
                    spAtaque: pokemon.spAtaque,
                    spDefensa: pokemon.spDefensa,
                    velocidad: pokemon.velocidad
                });
            }).catch(error => {
                console.log(error);
            });
    }
    const changeHandler = e => {
        setAllStats({ ...allStats, [e.target.name]: e.target.value })
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const pokemon = {
            numero: allStats.numero,
            nombre: allStats.nombre,
            descripcion: allStats.descripcion,
            tipoUno: allStats.tipoUno,
            tipoDos: allStats.tipoDos,
            habilidadUno: allStats.habilidadUno,
            habilidadDos: allStats.habilidadDos,
            habilidadTres: allStats.habilidadTres,
            lvlEvolucion: allStats.lvlEvolucion,
            evolucionPrevia: allStats.evolucionPrevia,
            evolucionPosterior: allStats.evolucionPosterior,
            hp: allStats.hp,
            ataque: allStats.ataque,
            defensa: allStats.defensa,
            spAtaque: allStats.spAtaque,
            spDefensa: allStats.spDefensa,
            velocidad: allStats.velocidad
        };
        console.log(pokemon);
        if (id) {
            editPokemon(pokemon);
        } else {
            insertPokemon(pokemon);
        }

    }
    const editPokemon = (pokemon) => {
        axios.put(`http://localhost:3000/pokemon/update/${id}`, pokemon)
            .then(res => {
                console.log(res.data);
                navigate('/adm/pokemon');
            }).catch(error => {
                console.log(error);
            });
    }
    const insertPokemon = (pokemon) => {
        axios.post('http://localhost:3000/pokemon', pokemon)
            .then(res => {
                console.log(res.data);
                navigate('/adm/pokemon');
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario Pokemon</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={allStats.nombre} type="text"
                                            onChange={changeHandler} id="nombre" name="nombre" />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Número Pokedex:</Form.Label>
                                        <Form.Control required value={allStats.numero} type="number"
                                            onChange={changeHandler} id="numero" name="numero" />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un número.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Tipo 1:</Form.Label>
                                        <Form.Control required as="select" value={allStats.tipoId_1}
                                            onChange={changeHandler} id="tipoId_1" name="tipoId_1">
                                            <option value="">Seleccione...</option>
                                            {ListaTipos.map(tipo =>
                                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                            )}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un tipo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Tipo 2:</Form.Label>
                                        <Form.Control as="select" value={allStats.tipoId_2}
                                            onChange={changeHandler} id="tipoId_2" name="tipoId_2">
                                            <option value="">Seleccione...</option>
                                            {ListaTipos.map(tipo =>
                                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Habilidad 1:</Form.Label>
                                        <Form.Control required as="select" value={allStats.habilidadId_1}
                                            onChange={changeHandler} id="habilidadId_1" name="habilidadId_1">
                                            <option value="">Seleccione...</option>
                                            {ListaHabilidades.map(habilidad =>
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            )}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione una habilidad.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Habilidad 2:</Form.Label>
                                        <Form.Control as="select" value={allStats.habilidadId_2}
                                            onChange={changeHandler} id="habilidadId_2" name="habilidadId_2">
                                            <option value="">Seleccione...</option>
                                            {ListaHabilidades.map(habilidad =>
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Habilidad 3:</Form.Label>
                                        <Form.Control as="select" value={allStats.habilidadId_3}
                                            onChange={changeHandler} id="habilidadId_3" name="habilidadId_3">
                                            <option value="">Seleccione...</option>
                                            {ListaHabilidades.map(habilidad =>
                                                <option key={habilidad.id} value={habilidad.id}>{habilidad.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Nivel de Evolución:</Form.Label>
                                        <Form.Control value={allStats.lvlEvolucion} type="number"
                                            onChange={changeHandler} id="lvlEvolucion" name="lvlEvolucion" />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Evolución Previa</Form.Label>
                                        <Form.Control as="select" value={allStats.evolucionPrevia}
                                            onChange={changeHandler} id="evolucionPrevia" name="evolucionPrevia">
                                            <option value="">Seleccione...</option>
                                            {ListaPokemones.map(pokemon =>
                                                <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Evolución Posterior</Form.Label>
                                        <Form.Control as="select" value={allStats.evolucionPosterior}
                                            onChange={changeHandler} id="evolucionPosterior" name="evolucionPosterior">
                                            <option value="">Seleccione...</option>
                                            {ListaPokemones.map(pokemon =>
                                                <option key={pokemon.id} value={pokemon.id}>{pokemon.nombre}</option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Descripción:</Form.Label>
                                        <Form.Control value={allStats.descripcion} as="textarea"
                                            onChange={changeHandler} id="descripcion" name="descripcion" />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>HP:</Form.Label>
                                        <Form.Control value={allStats.hp} type="number"
                                            onChange={changeHandler} id="hp" name="hp" />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Ataque:</Form.Label>
                                        <Form.Control value={allStats.ataque} type="number"
                                            onChange={changeHandler} id="ataque" name="ataque" />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Defensa:</Form.Label>
                                        <Form.Control value={allStats.defensa} type="number"
                                            onChange={changeHandler} id="defensa" name="defensa" />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Sp. Ataque:</Form.Label>
                                        <Form.Control value={allStats.spAtaque} type="number"
                                            onChange={changeHandler} id="spAtaque" name="spAtaque" />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Sp. Defensa:</Form.Label>
                                        <Form.Control value={allStats.spDefensa} type="number"
                                            onChange={changeHandler} id="spDefensa" name="spDefensa" />
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Velocidad:</Form.Label>
                                        <Form.Control value={allStats.velocidad} type="number"
                                            onChange={changeHandler} id="velocidad" name="velocidad" />
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default FormPokemon;
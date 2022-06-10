import React, { useEffect, useState } from "react";
import Main from "../templates/Main";
import axios from "axios";


// eslint-disable-next-line import/no-anonymous-default-export
export default props => {

  const [users, setUsers] = useState({
    icon: "user",
    title: "Usuários",
    subtitle: "Cadastro de Usuários: Incluir, Listar, Alterar e Excluir",
  });

  const baseUrl = "http://localhost:3001/users";
  const [usuario, setUsuario] = useState({
    id: null,
    name: "",
    email: "",
    adress: "",
    number: ""
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get(baseUrl)
      .then(resp => setList(resp.data))
  }, [])

  // console.log(list);

  function clear() {
    setUsuario({
      name: "",
      email: "",
      adress: "",
      number: ""
    })
  }

  function save() {
    const user = { ...usuario };
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user)
      .then(resp => {
        const list = getUpdateList(resp.data);
        setList(list);
        setUsuario({
          name: "",
          email: "",
          adress: "",
          number: ""
        });
      })
  }

  function getUpdateList(user, add = true) {
    const lista = list.filter(u => u.id !== user.id);
    if (add) lista.unshift(user)
    return lista
  }

  function updateField(event) {
    const user = { ...usuario };
    user[event.target.name] = event.target.value;
    setUsuario(user);
  }

  useEffect(() => {
    setList(list);
  }, [list])

  function renderForm() {
    return (
      <div className="form" id="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control"
                name="name"
                value={usuario.name}
                onChange={e => updateField(e)}
                placeholder="Digite o nome..." />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail</label>
              <input type="text" className="form-control"
                name="email"
                value={usuario.email}
                onChange={e => updateField(e)}
                placeholder="Digite o e-mail..." />
            </div>
          </div>

          <div className="col-12 col-md-6 mt-3">
            <div className="form-group">
              <label>Endereço</label>
              <input type="text" className="form-control"
                name="adress"
                value={usuario.adress}
                onChange={e => updateField(e)}
                placeholder="Digite o endereço..." />
            </div>
          </div>

          <div className="col-12 col-md-6 mt-3">
            <div className="form-group">
              <label>Número</label>
              <input type="text" className="form-control"
                name="number"
                value={usuario.number}
                onChange={e => updateField(e)}
                placeholder="Digite o número..." />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end p-2">
            <button className="btn btn-primary"
              onClick={e => save(e)}>
              Salvar
            </button>

            <button className="btn btn-danger ms-2"
              onClick={() => clear()}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  function load(user) {
    setUsuario(user);
  }

  function remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then(resp => {
      const list = getUpdateList(user, false);
      setList(list);
    });
  }

  function renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Número</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    )
  }

  function renderRows() {
    return list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.adress}</td>
          <td>{user.number}</td>
          <td>
            <button className="btn btn-warning"
              onClick={() => load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ms-2"
              onClick={() => remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <Main {...users}>
      {renderForm()}
      {renderTable()}
      <div className="topo">
        <a href="#form">Topo</a>
      </div>
    </Main>
  )
}
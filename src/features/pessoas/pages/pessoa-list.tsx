import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TipoTransacao } from "@/features/transacoes/models/transacoes";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Pessoa } from "../models/pessoa";
import CadastroPessoa from "./pessoa-form";
import "./pessoa-list.css";

export const PessoasList = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mostrarFormTransistors, setMostrarFormTransistors] = useState(false);

  const [formData, setFormData] = useState({
    descricao: "",
    valor: 0,
    tipo: TipoTransacao.DESPESA,
  });

  const [transacaoPessoaId, setTransacaoPessoaId] = useState<number | null>(
    null
  );

  const handleTransacaoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tipo" ? Number(value) : value,
    }));
  };

  const handleTransacaoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.descricao ||
      !formData.valor ||
      !formData.tipo ||
      transacaoPessoaId === null
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/transacoes", {
        id: 0,
        descricao: formData.descricao,
        valor: formData.valor,
        tipo: formData.tipo,
        pessoaId: transacaoPessoaId,
      });
      alert("Transação realizada com sucesso!");
      setMostrarFormTransistors(false);
    } catch (error) {
      console.error("Erro ao realizar transação:", error);
      alert("Erro ao realizar a transação");
    }
  };

  const handleDeletePessoa = (id: number) => {
    try {
      api.delete(`/pessoas/${id}`);
      alert("pessoa apagada com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao apagar pessoa:", error);
      alert("Erro ao apagar pessoa");
    }
  };

  useEffect(() => {
    if (mostrarFormTransistors === false) {
      setFormData({ descricao: "", valor: 0, tipo: TipoTransacao.DESPESA });
    }
  }, [mostrarFormTransistors]);

  useEffect(() => {
    api.get("/pessoas").then((response) => setPessoas(response.data));
  }, [mostrarForm]);

  return (
    <div className="card-container">
      <Card>
        <CardHeader>
          <h1>Lista de Pessoas</h1>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setMostrarForm(true)}>Cadastrar Pessoa</Button>

          {mostrarForm && (
            <CadastroPessoa onClose={() => setMostrarForm(false)} />
          )}

          <ul className="pessoas-list">
            {pessoas.map((pessoa) => (
              <li key={pessoa.id} className="pessoa-item">
                <span>
                  {pessoa.nome} ({pessoa.idade} anos)
                </span>
                <div className="list-buttons">
                  <Button
                    onClick={() => {
                      setTransacaoPessoaId(pessoa.id);
                      setMostrarFormTransistors(true);
                    }}
                  >
                    Realizar Transação
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeletePessoa(pessoa.id);
                    }}
                  >
                    Apagar
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {mostrarFormTransistors && transacaoPessoaId !== null && (
            <form className="transacao-form" onSubmit={handleTransacaoSubmit}>
              <h2>Nova Transação</h2>
              <div>
                <label>Descrição:</label>
                <input
                  type="text"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleTransacaoChange}
                />
              </div>
              <div>
                <label>Valor:</label>
                <input
                  type="number"
                  name="valor"
                  value={formData.valor}
                  onChange={handleTransacaoChange}
                />
              </div>
              <div>
                <label>Tipo:</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleTransacaoChange}
                >
                  <option value={TipoTransacao.DESPESA}>Despesa</option>
                  <option value={TipoTransacao.RECEITA}>Receita</option>
                </select>
              </div>
              <div className="card-buttons">
                <Button type="submit" className="save-btn">
                  Confirmar Transação
                </Button>
                <Button
                  onClick={() => setMostrarFormTransistors(false)}
                  className="cancel-btn"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

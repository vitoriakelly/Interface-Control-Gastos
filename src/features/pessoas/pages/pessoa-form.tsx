import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pessoa-form.css";

interface Props {
  onClose: () => void;
}

export default function CadastroPessoa({ onClose }: Props) {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  const handleSubmit = async () => {
    await api.post("/pessoas", { nome, idade: parseInt(idade) });
    onClose();
    navigate(-1);
  };

  return (
    <Card className="card">
      <CardHeader className="card-header">
        <h2>Cadastrar Pessoa</h2>
      </CardHeader>
      <CardContent className="card-content">
        <Input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          placeholder="Idade"
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <div className="card-buttons">
          <Button onClick={handleSubmit} className="save-btn">
            Salvar
          </Button>
          <Button onClick={onClose} className="cancel-btn">
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

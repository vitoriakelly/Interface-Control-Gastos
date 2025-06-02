import api from "@/services/api";
import { useEffect, useState } from "react";
import { Totais } from "../models/transacoes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "./transacoes-list.css";

export const TransacoesList = () => {
  const [totais, setTotais] = useState<Totais[]>([]);

  useEffect(() => {
    api.get("/transacoes/totais").then((response) => setTotais(response.data));
  }, []);

  return (
    <div className="lista-totais">
      {totais.map((item, index) => (
        <Card key={index} className="card-total">
          <CardHeader className="card-header">
            <CardTitle>{item.pessoa}</CardTitle>
          </CardHeader>
          <CardContent className="card-content">
            <p>
              <strong>Total Receitas:</strong> R${" "}
              {item.totalReceitas.toFixed(2)}
            </p>
            <p>
              <strong>Total Despesas:</strong> R${" "}
              {item.totalDespesas.toFixed(2)}
            </p>
            <p
              className={item.saldo >= 0 ? "saldo-positivo" : "saldo-negativo"}
            >
              <strong>Saldo:</strong> R$ {item.saldo.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

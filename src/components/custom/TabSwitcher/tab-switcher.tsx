import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PessoasList } from "@/features/pessoas/pages/pessoa-list";
import { TransacoesList } from "@/features/transacoes/pages/transacoes-list";
import "./tab-switcher.css";

const TabSwitcher = () => {
  return (
    <div className="tabs-container">
      <Tabs defaultValue="pessoas">
        <TabsList className="tabs-list">
          <TabsTrigger className="tab-trigger" value="pessoas">
            Pessoas
          </TabsTrigger>
          <TabsTrigger className="tab-trigger" value="transacoes">
            Transações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pessoas">
          <PessoasList />
        </TabsContent>

        <TabsContent value="transacoes">
          <TransacoesList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabSwitcher;

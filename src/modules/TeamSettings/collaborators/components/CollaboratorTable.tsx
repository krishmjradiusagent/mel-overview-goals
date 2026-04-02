import { Search } from "lucide-react";
import { Collaborator, Client, Transaction } from "../types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../../components/ui/Table";
import { CollaboratorRow } from "./CollaboratorRow";
import { useState } from "react";

interface CollaboratorTableProps {
  collaborators: Collaborator[];
  allClients: Client[];
  allTransactions: Transaction[];
  onRemove: (c: Collaborator) => void;
  onResend: (id: string) => void;
}

export function CollaboratorTable({
  collaborators,
  allClients,
  allTransactions,
  onRemove,
  onResend,
}: CollaboratorTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow className="hover:bg-transparent border-b-[#F0F0F0]">
              <TableHead className="w-[200px] pl-8 text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none">Identity</TableHead>
              <TableHead className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none text-center">Category</TableHead>
              <TableHead className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none">Authentication</TableHead>
              <TableHead className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none text-center">Access Level</TableHead>
              <TableHead className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none text-right pr-8">Volume</TableHead>
              <TableHead className="w-[50px] pr-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white text-center">
            {collaborators.map((collaborator) => (
              <CollaboratorRow 
                key={collaborator.id}
                collaborator={collaborator}
                isExpanded={expandedId === collaborator.id}
                onToggleExpand={() => toggleExpand(collaborator.id)}
                allClients={allClients}
                allTransactions={allTransactions}
                onRemove={onRemove}
                onResend={onResend}
              />
            ))}
            {collaborators.length === 0 && (
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell colSpan={6} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-40 text-slate-400">
                     <Search className="h-8 w-8 text-slate-300" />
                     <p className="font-bold uppercase text-[10px] tracking-widest">No matching collaborators found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

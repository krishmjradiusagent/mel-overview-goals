import { useState } from "react";
import { useCollaborators } from "./collaborators/hooks/useCollaborators";
import { CollaboratorTable } from "./collaborators/components/CollaboratorTable";
import { InviteCollaboratorModal } from "./collaborators/components/InviteCollaboratorModal";
import { RemoveCollaboratorConfirm } from "./collaborators/components/RemoveCollaboratorConfirm";
import { Collaborator } from "./collaborators/types";

export function CollaboratorsSection() {
  const {
    collaborators,
    totalCount,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    inviteCollaborator,
    removeCollaborator,
    resendInvite,
    existingEmails,
    allClients,
    allTransactions,
  } = useCollaborators();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<Collaborator | null>(null);

  const handleInvite = (data: { type: any; email: string }) => {
    inviteCollaborator(data);
  };

  const handleRemoveClick = (c: Collaborator) => {
    setRemoveTarget(c);
  };

  const activeCollaborators = collaborators.filter(c => c.status === "active");

  return (
    <div className="w-full space-y-12 font-sans px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
         <div className="space-y-4 flex-1">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-[#111827] uppercase tracking-wide">Collaborators</h2>
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)] animate-pulse" />
               </div>
               
               <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 flex items-center gap-2">
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest leading-none">{totalCount} Members</span>
               </div>
            </div>
            
            <p className="text-[14px] text-slate-500 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
               Manage invitations, roles, and assignments for your external collaborators.
            </p>
         </div>
      </div>

      {/* The Table - Pass a light mode prop or handle it inside */}
      <CollaboratorTable 
        collaborators={collaborators}
        allClients={allClients}
        allTransactions={allTransactions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterType={filterType}
        setFilterType={setFilterType}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        onAddCollaborator={() => setIsInviteModalOpen(true)}
        onRemove={handleRemoveClick}
        onResend={resendInvite}
      />

      {/* Modals */}
      <InviteCollaboratorModal 
        open={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
        onInviteSent={handleInvite}
        existingEmails={existingEmails}
      />

      <RemoveCollaboratorConfirm 
        open={!!removeTarget}
        onOpenChange={(val) => !val && setRemoveTarget(null)}
        collaborator={removeTarget}
        activeCollaborators={activeCollaborators}
        onConfirm={(id, reassignId) => {
          removeCollaborator(id, reassignId);
          setRemoveTarget(null);
        }}
      />
    </div>
  );
}

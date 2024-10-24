

import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"


interface PromotionModalProps {
isOpen: boolean;
onClose: () => void;
promotePawn: (piece: 'queen' | 'rook' | 'bishop' | 'knight') => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, promotePawn }) => {
return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogTitle className="text-lg font-semibold mb-4 justify-center place-self-center text-white">Select a Piece for Promotion</DialogTitle>
      <div className="flex space-x-4 justify-center items-center">
        <button onClick={() => promotePawn('queen')} className="p-2 bg-gray-300 hover:bg-gray-400">Queen</button>
        <button onClick={() => promotePawn('rook')} className="p-2 bg-gray-300 hover:bg-gray-400">Rook</button>
        <button onClick={() => promotePawn('bishop')} className="p-2 bg-gray-300 hover:bg-gray-400">Bishop</button>
        <button onClick={() => promotePawn('knight')} className="p-2 bg-gray-300 hover:bg-gray-400">Knight</button>
      </div>
    </DialogContent>
  </Dialog>
);
};

export default PromotionModal;

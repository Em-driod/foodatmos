import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, ShoppingBag, Layers, ArrowRight, Copy } from 'lucide-react';
import { FoodItem, ProteinOption } from '../types';

interface MultiOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: FoodItem | null;
    proteins: ProteinOption[];
    onConfirm: (item: FoodItem, selections: { quantity: number, proteins: ProteinOption[] }[]) => void;
}

type ModalMode = 'choice' | 'single' | 'bulk-same' | 'bulk-diff';

const MultiOrderModal: React.FC<MultiOrderModalProps> = ({ isOpen, onClose, item, proteins, onConfirm }) => {
    const [mode, setMode] = useState<ModalMode>('choice');
    const [quantity, setQuantity] = useState(2);
    const [selections, setSelections] = useState<{ id: number, proteins: ProteinOption[] }[]>([]);
    const [sameProteins, setSameProteins] = useState<ProteinOption[]>([]);

    useEffect(() => {
        if (isOpen) {
            setMode('choice');
            setQuantity(2);
            setSelections([{ id: 0, proteins: [] }, { id: 1, proteins: [] }]);
            setSameProteins([]);
        }
    }, [isOpen]);

    if (!isOpen || !item) return null;

    const handleQuantityChange = (newQty: number) => {
        const qty = Math.max(1, Math.min(10, newQty));
        setQuantity(qty);
        if (mode === 'bulk-diff') {
            setSelections(prev => {
                if (qty > prev.length) {
                    const added = Array.from({ length: qty - prev.length }, (_, i) => ({
                        id: prev.length + i,
                        proteins: []
                    }));
                    return [...prev, ...added];
                } else {
                    return prev.slice(0, qty);
                }
            });
        }
    };

    const toggleProtein = (id: number | null, protein: ProteinOption) => {
        if (id === null) {
            // Same protein for all (Single or Bulk-Same)
            setSameProteins(prev => {
                const alreadySelected = prev.find(p => p.id === protein.id || p._id === protein._id);
                return alreadySelected
                    ? prev.filter(p => (p.id !== protein.id && p._id !== protein._id))
                    : [...prev, protein];
            });
        } else {
            // Individual selection (Bulk-Diff)
            setSelections(prev => prev.map(s => {
                if (s.id === id) {
                    const alreadySelected = s.proteins.find(p => p.id === protein.id || p._id === protein._id);
                    return {
                        ...s,
                        proteins: alreadySelected
                            ? s.proteins.filter(p => (p.id !== protein.id && p._id !== protein._id))
                            : [...s.proteins, protein]
                    };
                }
                return s;
            }));
        }
    };

    const handleConfirm = () => {
        if (mode === 'single') {
            onConfirm(item, [{ quantity: 1, proteins: sameProteins }]);
        } else if (mode === 'bulk-same') {
            onConfirm(item, [{ quantity, proteins: sameProteins }]);
        } else {
            const finalSelections = selections.map(s => ({
                quantity: 1,
                proteins: s.proteins
            }));
            onConfirm(item, finalSelections);
        }
        onClose();
    };

    const availableProteins = proteins;

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-orange-950/40 backdrop-blur-md animate-reveal-fade"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-reveal-up flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-orange-950 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-2xl text-orange-400">
                            <Layers size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-serif font-black tracking-tight">{item.name} Pack</h2>
                            {mode !== 'choice' && (
                                <button onClick={() => setMode('choice')} className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300 hover:text-white flex items-center gap-1 transition-colors">
                                    <ArrowRight size={10} className="rotate-180" /> Change pack type
                                </button>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                    {mode === 'choice' && (
                        <div className="space-y-8 py-4">
                            <div className="text-center space-y-4">
                                <h3 className="text-3xl font-serif font-black text-orange-950">How many plates?</h3>
                                <p className="text-stone-400 font-medium text-base">Select your ordering style for this Atmos delicacy.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => setMode('single')}
                                    className="group p-8 rounded-3xl border-2 border-stone-100 bg-stone-50 hover:bg-white hover:border-orange-400 hover:shadow-xl transition-all flex items-center gap-6 text-left"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-950 shadow-sm group-hover:bg-orange-100 transition-colors shrink-0">
                                        <ShoppingBag size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-black text-xl text-orange-950">Just 1 Plate</h4>
                                        <p className="text-stone-400 text-sm font-medium">Standard portion with your choice of proteins.</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setMode('bulk-same')}
                                    className="group p-8 rounded-3xl border-2 border-stone-100 bg-stone-50 hover:bg-white hover:border-orange-400 hover:shadow-xl transition-all flex items-center gap-6 text-left"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-950 shadow-sm group-hover:bg-orange-100 transition-colors shrink-0">
                                        <Copy size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-black text-xl text-orange-950">Bulk (Same Proteins)</h4>
                                        <p className="text-stone-400 text-sm font-medium">Multiple plates, same protein selection for all.</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setMode('bulk-diff')}
                                    className="group p-8 rounded-3xl border-2 border-stone-100 bg-stone-50 hover:bg-white hover:border-orange-400 hover:shadow-xl transition-all flex items-center gap-6 text-left"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-950 shadow-sm group-hover:bg-orange-100 transition-colors shrink-0">
                                        <Layers size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-black text-xl text-orange-950">Bulk (Custom Mix)</h4>
                                        <p className="text-stone-400 text-sm font-medium">Customize proteins for each plate individually.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {mode !== 'choice' && (
                        <div className="space-y-10 animate-reveal-up">
                            {mode !== 'single' && (
                                <div className="flex flex-col items-center gap-6 pb-10 border-b border-stone-100">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300">Total Plates</span>
                                    <div className="flex items-center gap-8 bg-orange-50 p-2 rounded-3xl border border-orange-100 shadow-inner">
                                        <button onClick={() => handleQuantityChange(quantity - 1)} className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl border border-stone-100 text-stone-400 hover:text-red-500 transition-all active:scale-90"><Minus size={24} /></button>
                                        <span className="text-4xl font-serif font-black text-orange-950 w-16 text-center">{quantity}</span>
                                        <button onClick={() => handleQuantityChange(quantity + 1)} className="w-14 h-14 flex items-center justify-center bg-orange-950 text-white rounded-2xl shadow-lg hover:bg-black transition-all active:scale-90"><Plus size={24} /></button>
                                    </div>
                                </div>
                            )}

                            {mode === 'single' || mode === 'bulk-same' ? (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black text-stone-300 uppercase tracking-widest">Customize Proteins</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {availableProteins.map(protein => {
                                            const isActive = sameProteins.find(p => p.id === protein.id || p._id === protein._id);
                                            return (
                                                <button key={protein.id || protein._id} onClick={() => toggleProtein(null, protein)} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isActive ? 'bg-orange-100 border-orange-400' : 'bg-white border-stone-100 hover:border-orange-200 shadow-sm'}`}>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isActive ? 'bg-orange-950 border-orange-950 text-white' : 'bg-white border-stone-300'}`}>{isActive && <Check size={12} strokeWidth={4} />}</div>
                                                        <span className="text-[11px] font-black text-orange-950 uppercase">{protein.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-stone-400">+₦{protein.price.toLocaleString()}</span>
                                                </button>
                                            );
                                        })}
                                        {availableProteins.length === 0 && <p className="col-span-full py-4 text-center text-[10px] font-black uppercase tracking-widest text-stone-300 italic">No extra proteins available</p>}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {selections.map((selection, index) => (
                                        <div key={selection.id} className="bg-stone-50 rounded-[2rem] p-8 border border-stone-100 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <span className="px-5 py-2 bg-orange-400 text-white text-[10px] font-black uppercase tracking-widest rounded-full">Plate {index + 1}</span>
                                                <span className="text-xs font-black text-stone-300 uppercase tracking-widest">Proteins</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {availableProteins.map(protein => {
                                                    const isActive = selection.proteins.find(p => p.id === protein.id || p._id === protein._id);
                                                    return (
                                                        <button key={protein.id || protein._id} onClick={() => toggleProtein(selection.id, protein)} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isActive ? 'bg-orange-100 border-orange-400' : 'bg-white border-stone-100 hover:border-orange-200 shadow-sm'}`}>
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${isActive ? 'bg-orange-950 border-orange-950 text-white' : 'bg-white border-stone-300'}`}>{isActive && <Check size={12} strokeWidth={4} />}</div>
                                                                <span className="text-[11px] font-black text-orange-950 uppercase">{protein.name}</span>
                                                            </div>
                                                            <span className="text-[10px] font-bold text-stone-400">+₦{protein.price.toLocaleString()}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {mode !== 'choice' && (
                    <div className="p-8 border-t border-stone-100 bg-stone-50/50 shrink-0">
                        <button onClick={handleConfirm} className="w-full bg-orange-400 hover:bg-black text-white py-6 rounded-[1.5rem] font-black flex items-center justify-center gap-4 shadow-xl transition-all active:scale-95 text-base uppercase tracking-[0.2em]">
                            Sync to Pack <ArrowRight size={24} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiOrderModal;

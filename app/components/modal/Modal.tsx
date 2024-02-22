import { ReactNode, createContext, useContext, useState } from "react";
import Close from "../button_icons/Close";

type ModalContextType = {
    title?: string|null;
    content?: ReactNode|null;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    setTitle: (title: string) => void;
    setContent: (content: ReactNode|string) => void;
};

type ModalProviderProps = {
    children: ReactNode;
}

const ModalContext = createContext<ModalContextType>({
    title: null,
    content: null,
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
    setTitle: () => {},
    setContent: () => {},
});

export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, _setTitle] = useState<string|null>(null);
    const [content, _setContent] = useState<ReactNode|null>(null);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => {
        setIsModalOpen(false)
        _setTitle(null);
        _setContent(null);
    };
    const setTitle = (title: string) => _setTitle(title);
    const setContent = (content: ReactNode|string) => _setContent(content);

	return (
		<ModalContext.Provider value={{ title, content, isModalOpen, openModal, closeModal, setContent, setTitle }}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
    const { setTitle, setContent, openModal, closeModal } = useContext(ModalContext);

    return {
        setTitle,
        setContent,
        openModal,
        closeModal
    }
}

export const ModalContainer = ({ children }: { children: ReactNode }) => {
    return (<>
        <Modal />
        {children}
    </>);
}


/**
 * Modal component
 */
const Modal = () => {
	const { isModalOpen, closeModal, title, content } = useContext(ModalContext);

	if (!isModalOpen) return null;

	return (
		<div className="modal-overlay w-full h-full bg-slate-100/80 backdrop-blur-sm z-10 fixed flex justify-center items-center">
			<div className="modal rounded-xl bg-white shadow-2xl overflow-hidden">
				<div className="modal-header flex flex-row justify-end items-center pt-2 px-2 pb-1 capitalize bg-teal-800 text-white text-sm">
					{!!title && <h2 className="mr-auto">{title}</h2>}
					<Close hideLabel={true} onClick={closeModal} />
				</div>
				<div className="modal-content">
					{content}
				</div>
			</div>
		</div>
	);
};

export default ModalContext;
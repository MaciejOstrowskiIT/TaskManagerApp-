import { useEffect, useState, createContext, useContext, FC, ReactNode } from "react";
import { Alert } from "@mui/material";

export type AlertSeverity = "success" | "info" | "warning" | "error";

export interface AlertProviderProps {
	children: ReactNode;
}

type MessageTypes = {
	content: string | null;
	alertType: AlertSeverity;
}

export interface AlertContextType {
	message: MessageTypes;
	setMessage: (alert: MessageTypes) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlertContext = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlert must be used within an AlertProvider");
	}
	return context;
};

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
	const [message, setMessage] = useState<MessageTypes>({ alertType: "info", content: null, });

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (message.content !== null) {
			timer = setTimeout(() => {
				setMessage((message) => ({ ...message, content: null }));
			}, 2500);
		}
		return () => clearTimeout(timer);
	}, [message.content]);

	return (
		<AlertContext.Provider
			value={{
				message,
				setMessage,
			}}
		>
			{message.content && (
				<Alert style={{
					position: "fixed",
					zIndex: 999,
					top: "10%",
					transform: "translateY(-50%)",
					right: 0,
					marginRight: "10px"
				}}
					severity={message.alertType}>
					{message.content}
				</Alert>
			)}
			{children}
		</AlertContext.Provider>
	);
};

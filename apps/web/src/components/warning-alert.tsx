import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

type Props = {
	text?: string;
};

const WarningAlert = ({ text }: Props) => {
	if (!text) {
		return null;
	}

	return (
		<output
			aria-live="polite"
			role="status"
			className="alert text-warning mt-2 py-1"
		>
			<ExclamationTriangleIcon className="h-6 w-6" />
			<span>{text}</span>
		</output>
	);
};

export default WarningAlert;

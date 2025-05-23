const enterToNextRef = (
	event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
	nextRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>
) => {
	if (event.key === "Enter" && nextRef) {
		event.preventDefault(); // Prevent form submission
		nextRef.current?.focus();
	}
};

export default enterToNextRef;

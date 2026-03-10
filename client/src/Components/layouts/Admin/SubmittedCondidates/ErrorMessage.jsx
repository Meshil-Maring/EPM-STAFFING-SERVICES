function ErrorMessage({ message, type }) {
  if (!message) return null;

  return (
    <div
      className={`w-full text-center py-2 text-sm ${
        type === "success" ? "text-text_green" : "text-red-dark"
      }`}
    >
      {message}
    </div>
  );
}

export default ErrorMessage;

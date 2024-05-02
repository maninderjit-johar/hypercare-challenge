import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderRadius: "5px",
          backgroundColor: "var(--modal-background)",
          color: "var(--modal-text)",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        {children}
        <button onClick={onClose} style={{ marginTop: "20px" }}>
          Close
        </button>
      </div>
    </div>
  );
};

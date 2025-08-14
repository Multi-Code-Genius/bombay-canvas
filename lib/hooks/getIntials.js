export const getInitials = (name = "") => {
  if (!name || typeof name !== "string") return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    const first = parts[0];
    const a = first.charAt(0) || "";
    const b = first.charAt(1) || "";
    return (a + b).toUpperCase();
  }
  const first = parts[0]?.charAt(0) || "";
  const last = parts[parts.length - 1]?.charAt(0) || "";
  return (first + last).toUpperCase();
};

export const applyDataQualityFunction = (func, value) => {
  if (typeof value !== "string") return value; // ✅ Ensure value is a string

  switch (func) {
    case "UPPER":
      return value.toUpperCase();
    case "LOWER":
      return value.toLowerCase();
    case "TRIM":
      return value.trim();
    default:
      return value;
  }
};


const renderHandlers = {
  string: (value, onChange, _, extra = {}) => (
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      {...extra}
      style={{
        width: "100%",
        minHeight: "50px",
        resize: "none",
        overflowWrap: "break-word",
        whiteSpace: "normal",
        ...extra.style,
      }}
    />
  ),
  email: (value, onChange, _, extra = {}) => (
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      {...extra}
      style={{
        width: "100%",
        minHeight: "50px",
        resize: "none",
        overflowWrap: "break-word",
        whiteSpace: "normal",
        ...extra.style,
      }}
    />
  ),
  number: (value, onChange, _, extra = {}) => (
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      {...extra}
    />
  ),
  boolean: (value, onChange, _, extra = {}) => (
    <input
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
      {...extra}
    />
  ),
  select: (value, onChange, options = [], extra = {}) => (
    <select value={value || ""} onChange={(e) => onChange(e.target.value)} {...extra}>
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  ),
};


export function renderByType(type, value, onChange, options, extra) {
  const handler = renderHandlers[type] || ((v) => <span>{v}</span>);
  return handler(value, onChange, options, extra);
}

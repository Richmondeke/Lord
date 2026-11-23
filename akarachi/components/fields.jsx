"use client";

import {
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  FileCheckCorner as FileCheckCornerIcon,
  Trash as TrashIcon,
  Upload as UploadIcon,
} from "lucide-react";
import { useRef, useState, useId } from "react";
let CI = EyeIcon;
let CL = EyeOffIcon;
let CD = FileCheckCornerIcon;
let CM = TrashIcon;
let CP = UploadIcon,
  u = ["application/pdf", "image/jpeg", "image/png"];
// With `upload`, the file is sent as soon as it is chosen; `upload` resolves to the saved value or { error }.
function FileField({
  label: e,
  optional: s,
  value: r,
  onChange: i,
  upload,
  onRemove,
}) {
  let n = useRef(null),
    [l, o] = useState(false),
    c = useId();
  function h(e) {
    if (e) {
      if (!u.includes(e.type))
        return i({
          error: `${e.name} is not a PDF, JPG or PNG. Choose a file in one of those formats.`,
        });
      if (e.size > 5242880)
        return i({
          error: `${e.name} is ${(e.size / 1048576).toFixed(1)} MB. The limit is 5 MB. Compress it or photograph it again.`,
        });
      if (!upload)
        return i({
          name: e.name,
          size: e.size,
        });
      i({ uploading: true, name: e.name });
      upload(e).then(i, () =>
        i({ error: "The upload failed. Check your connection and try again." }),
      );
    }
  }
  let busy = r && r.uploading,
    x = r && "name" in r && !busy,
    f = r && "error" in r ? r.error : undefined;
  return (
    <div>
      <p id={c} className="mb-1.5 font-semibold">
        {e}{" "}
        {s && (
          <span className="font-normal text-slate">(where applicable)</span>
        )}
      </p>
      {x ? (
        <div className="flex items-center gap-3 border-[1.5px] border-leaf bg-mint/60 p-4">
          <CD className="shrink-0 text-emerald" aria-hidden={true} />
          <p className="min-w-0 flex-1 truncate">
            {r.name}{" "}
            <span className="text-sm text-slate">
              {Math.max(1, Math.round(r.size / 1024))}
              {r.stored ? " KB, uploaded securely" : " KB, accepted"}
            </span>
          </p>
          <button
            type="button"
            onClick={() => (onRemove ? onRemove(r) : null, i(undefined))}
            aria-label={`Remove ${r.name}`}
            className="grid h-11 w-11 place-items-center hover:bg-mint"
          >
            <CM size={18} aria-hidden={true} />
          </button>
        </div>
      ) : busy ? (
        <div
          className="flex items-center gap-3 border-[1.5px] border-dashed border-emerald bg-mint/60 p-4"
          aria-live="polite"
        >
          <CP
            className="shrink-0 animate-pulse text-emerald"
            aria-hidden={true}
          />
          <p className="min-w-0 flex-1 truncate">
            {"Uploading "}
            {r.name}
            {"…"}
          </p>
        </div>
      ) : (
        <button
          type="button"
          aria-labelledby={c}
          onClick={() => n.current?.click()}
          onDragOver={(e) => {
            (e.preventDefault(), o(true));
          }}
          onDragLeave={() => o(false)}
          onDrop={(e) => {
            (e.preventDefault(), o(false), h(e.dataTransfer.files[0]));
          }}
          className={`flex w-full items-center gap-3 border-[1.5px] border-dashed p-4 text-left transition-colors ${f ? "border-brick bg-brick-soft/50" : l ? "border-emerald bg-mint" : "border-slate/60 bg-white hover:border-emerald"}`}
        >
          <CP className="shrink-0 text-emerald" aria-hidden={true} />
          <span>
            {"Drop the file here or "}
            <span className="link">choose a file</span>
            <span className="block text-sm text-slate">
              {"PDF, JPG or PNG, up to "}
              {5}
              {" MB"}
            </span>
          </span>
        </button>
      )}
      <input
        ref={n}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="sr-only"
        tabIndex={-1}
        aria-hidden={true}
        onChange={(e) => {
          (h(e.target.files?.[0]), (e.target.value = ""));
        }}
      />
      {f && (
        <p role="alert" className="mt-1.5 text-sm font-semibold text-brick">
          {f}
        </p>
      )}
    </div>
  );
}
export { FileField };
function Field({ label: e, hint: s, error: r, children: i }) {
  let n = useId(),
    l = r || s;
  return (
    <div>
      <label htmlFor={n} className="mb-1.5 block font-semibold">
        {e}
      </label>
      {i({
        id: n,
        "aria-describedby": l ? `${n}-n` : undefined,
        "aria-invalid": !!r || undefined,
      })}
      {l && (
        <p
          id={`${n}-n`}
          className={`mt-1.5 text-sm ${r ? "font-semibold text-brick" : "text-slate"}`}
        >
          {l}
        </p>
      )}
    </div>
  );
}
export { Field };
function PasswordField({ value: e, onChange: s, autoComplete: r, a11y: n }) {
  let [o, d] = useState(false);
  return (
    <div className="relative">
      <input
        {...n}
        className="field pr-12"
        type={o ? "text" : "password"}
        autoComplete={r}
        value={e}
        onChange={(e) => s(e.target.value)}
      />
      <button
        type="button"
        onClick={() => d(!o)}
        aria-label={o ? "Hide password" : "Show password"}
        aria-pressed={o}
        className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate hover:text-ink"
      >
        {o ? <CL size={20} /> : <CI size={20} />}
      </button>
    </div>
  );
}
export { PasswordField };

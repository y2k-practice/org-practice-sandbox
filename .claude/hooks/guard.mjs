// PreToolUse hook: 秘密情報らしき文字列の書き込みと main への直接 push を止める。exit 2 でブロック。
let raw = "";
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  let input = {};
  try { input = JSON.parse(raw); } catch { process.exit(0); }
  const ti = input.tool_input || {};
  const text = [ti.content, ti.new_string, ti.command].filter(Boolean).join("\n");
  const secretPatterns = [
    /AKIA[0-9A-Z]{16}/,
    /ghp_[A-Za-z0-9]{36}/,
    /github_pat_[A-Za-z0-9_]{20,}/,
    /sk-ant-[A-Za-z0-9_-]{20,}/,
    /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  ];
  if (secretPatterns.some((p) => p.test(text))) {
    console.error("BLOCKED: 秘密情報らしき文字列を含みます。");
    process.exit(2);
  }
  if (/git\s+push\b[^\n]*\b(main|master)\b/.test(ti.command || "")) {
    console.error("BLOCKED: main への直接 push は禁止です。PR を使ってください。");
    process.exit(2);
  }
  process.exit(0);
});

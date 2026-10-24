# GitHub 側の初期設定（人が行う）
1. 無料 Organization を作成（例: y2k-practice）。
2. 別アカウントを 2 つ用意し Org に招待: reviewer（Write）、dev（Write）。自分は admin。
3. このリポジトリを Org 配下に push（`gh` 導入後 `gh repo create` か、Web で作成して remote 追加）。
4. CODEOWNERS の `@REVIEWER_ACCOUNT` / `@ADMIN_ACCOUNT` を実アカウントに置換。
5. Settings > Rules > Rulesets > Import で `docs/branch-ruleset.json` を取り込む（無料 Org の private repo は ruleset 不可の場合あり → public で練習）。
6. Settings > Secrets: ANTHROPIC_API_KEY（手順4で使用）。Variables: ENABLE_AI_REVIEW=true。
7. Settings > Actions > General: Workflow permissions を Read のみ、fork PR は承認必須に。

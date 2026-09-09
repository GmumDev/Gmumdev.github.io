# 코드 블록 색상 규칙

포트폴리오 pptx의 `IMPLEMENTATION` 슬라이드 코드 박스에 적용하는 구문 강조 규칙이다.
**코드를 새로 넣거나 고칠 때마다 이 규칙대로 색을 다시 입힌다.**

기준은 Visual Studio 2022 Dark 테마다. 사용자가 실제로 코드를 보는 화면과 같은 색이어야
슬라이드의 코드가 낯설지 않다.

## 팔레트

| 토큰 | 색상 | 예 |
|---|---|---|
| 키워드 | `569CD6` | `public` `private` `class` `struct` `static` `readonly` `int` `string` `bool` `void` `var` `new` `true` `null` |
| 제어 키워드 | `C586C0` | `if` `else` `for` `foreach` `while` `do` `return` `break` `continue` `yield` |
| 타입 · 어트리뷰트 | `4EC9B0` | `MonoBehaviour` `List` `Dictionary` `SerializeField` `Rpc` `IConditionChecker` |
| 메서드 | `DCDCAA` | `Subscribe` `Raise` `Simulate` `Contains` |
| 필드 · 지역변수 · 매개변수 | `9CDCFE` | `_root` `cells` `attackers` `localPlayerId` |
| 문자열 | `CE9178` | `"Channels/Quest"` |
| 숫자 | `B5CEA8` | `0` `32` `1e+12` |
| 주석 | `6A9955` | `// ...` `/// ...` `# ...` |
| 그 외 · 구두점 | `DCDCDC` | `{` `}` `(` `)` `;` `=>` |

배경(코드 카드)은 템플릿이 정한 `232323`이며 **바꾸지 않는다.**

> 이전 규칙(전체 `E6E6E6`, 주석만 `9A9A9A`)은 폐기됐다. 그 두 색은 더 이상 쓰지 않는다.

## 판별 순서

앞에서 걸린 규칙이 이긴다. 순서를 바꾸면 결과가 달라진다.

1. **주석** — `//`, `///`, `#`(파이썬)부터 줄 끝까지. 안에 뭐가 있든 전부 주석색.
2. **문자열** — `"..."`, `'...'`, `"""..."""`. 이스케이프(`\"`)를 넘긴다.
3. **숫자** — `123`, `1.5f`, `0x1F`, `1e+12`.
4. **어트리뷰트** — `[` 바로 뒤 식별자는 타입색. `[Rpc(...)]`의 `Rpc`.
5. **키워드 · 제어 키워드** — 아래 목록과 정확히 일치하는 낱말.
6. **메서드** — 식별자 바로 뒤가 `(` 이면 메서드색.
7. **타입** — 대문자로 시작하거나 `I` + 대문자로 시작하는 식별자.
8. **식별자** — 나머지 전부 필드색.
9. **그 외** — 구두점·공백은 기본색.

## 낱말 목록

**키워드** — `abstract` `as` `async` `await` `base` `bool` `break`(제어) `byte` `case` `catch` `char`
`class` `const` `decimal` `default` `delegate` `double` `enum` `event` `explicit` `extern` `false`
`finally` `fixed` `float` `get` `goto` `implicit` `in` `int` `interface` `internal` `is` `lock` `long`
`namespace` `new` `null` `object` `operator` `out` `override` `params` `partial` `private` `protected`
`public` `readonly` `ref` `sbyte` `sealed` `set` `short` `sizeof` `static` `string` `struct` `switch`
`this` `throw` `true` `try` `typeof` `uint` `ulong` `unsafe` `ushort` `using` `value` `virtual` `void`
`volatile` `where` `while`(제어)

파이썬은 `def` `class` `import` `from` `return`(제어) `if`(제어) `elif`(제어) `else`(제어) `for`(제어)
`while`(제어) `in` `not` `and` `or` `None` `True` `False` `with` `as` `try` `except` `raise` `yield`(제어)
`lambda` `pass` `continue`(제어) `break`(제어) `global` `set`.

**제어 키워드** — `if` `else` `elif` `for` `foreach` `while` `do` `switch` `case` `return` `break`
`continue` `yield` `goto` `throw`.

## 적용 방법

```bash
python ppt/tools/highlight_code.py ppt/<project>_portfolio.pptx
```

인자 없이 돌리면 `ppt/*_portfolio.pptx` 전부를 처리한다. `--dry-run` 을 붙이면 무엇이 바뀌는지만
출력하고 저장하지 않는다.

이 스크립트는 `IMPLEMENTATION` 슬라이드의 코드 박스(`Text 4`, Courier New 글꼴)만 건드린다.
문단을 여러 run 으로 쪼개 색만 입히고, **글자·글꼴·크기·줄간격은 손대지 않는다.**
여러 번 돌려도 결과가 같다(멱등).

## 주의

- 코드 문자열을 바꾼 뒤에는 **반드시 다시 돌린다.** 문단 텍스트를 새로 쓰면 run 이 하나로 합쳐지며
  색이 전부 날아간다.
- 코드 박스의 한 줄은 68자(한글은 2자)를 넘기지 않는다. 넘치면 박스 밖으로 나간다.
- 코드 박스는 15줄까지다. 템플릿은 16줄로 설계돼 있지만 15줄이 안전하다.

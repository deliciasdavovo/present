# Presente

Um app de práticas para a saúde mental — para o **agora**. Visual limpo e
leve, sem distrações, com conteúdo baseado em pesquisas publicadas.

Na página inicial, 8 dimensões de cuidado:

| Dimensão | O que oferece |
|---|---|
| Respiração | Exercícios com **guia animado** (triângulo, quadrado, círculo, narina alternada, suspiro fisiológico) |
| Gratidão | Práticas com efeito demonstrado sobre humor e sono |
| Visualização | Imagens mentais validadas em pesquisa clínica |
| Movimentos que curam | Alongamento, tai chi, qigong e caminhada |
| Contemplação | Pausas de atenção com imagens, baseadas em psicologia ambiental |
| Música | Escuta, canto e ritmo como reguladores do humor |
| Humor | Riso e leveza com efeitos mensuráveis no estresse |
| Fazer o bem | Atos de generosidade que elevam o bem-estar de quem pratica |

Ao tocar em um card, o app sorteia uma prática da dimensão, **sem repetir**
até passar por todas (controle via `localStorage`). Cada prática traz:

- a instrução, clara e acionável;
- a **base científica** com a fonte (Harvard Medical School, Stanford,
  BMJ, Science, entre outras);
- quando faz sentido, uma nota complementar de medicina tradicional chinesa
  ou sobre amor e conexão.

As práticas de respiração abrem com um **guia visual animado e sincronizado**
com os tempos de inspirar, segurar e expirar — incluindo a respiração do
triângulo e a narina alternada ilustrada.

## Como rodar

Site estático, sem build e sem dependências:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Também funciona direto no GitHub Pages.

## PWA

Servido por HTTPS, o navegador oferece **"Adicionar à tela inicial"**: o app
abre em tela cheia, com ícone próprio, e funciona **offline** (service worker
guarda todas as práticas; imagens de contemplação ficam em cache após a
primeira visualização).

## Estrutura

```
index.html           # página única do app
manifest.webmanifest # manifesto do PWA
sw.js                # service worker (offline)
css/style.css        # design system
js/app.js            # cards, ícones, sorteio e tela da prática
js/breath.js         # motor do guia animado de respiração
js/data/*.js         # 8 arquivos de práticas (texto + base científica + fonte)
icons/               # ícones do app (gerados por tools/gen_icons.py)
```

> Estas práticas são um convite ao cuidado — não substituem acompanhamento
> médico ou psicológico.

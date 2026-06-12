# Presente 🤍

Um app de práticas para a saúde mental e do coração — para o **agora**.

Na página inicial você encontra 8 cards, um para cada dimensão de cuidado:

| Card | O que oferece |
|---|---|
| 🌅 Visualização | Imaginar cenas que acalmam e fortalecem a mente |
| 🙏 Gratidão | Treinar o olhar para o que já é presente |
| 🌬️ Respiração | Usar o fôlego para acalmar corpo e coração |
| 🌿 Movimentos que curam | Gestos suaves que soltam tensão e despertam energia |
| 🕊️ Contemplação | Descansar o olhar na beleza (com imagens) |
| 🎵 Músicas | Som, canto e ritmo como remédio para a alma |
| 😄 Senso de humor | Leveza e riso para arejar a mente |
| 💛 Fazer o bem | Sair de si com um gesto de amor por alguém |

Ao tocar em um card, o app sorteia **1 entre 100 práticas** daquela dimensão
(800 práticas no total). Cada prática vem com um pequeno fundamento, alternando
quatro prismas: **neurociência atual, medicina tradicional chinesa,
espiritualidade cristã e o poder do amor/conexão**.

O sorteio não repete: o app embaralha as 100 práticas de cada dimensão e só
volta a repetir depois que você passou por todas (guardado no `localStorage`).

## Como rodar

É um site estático, sem build e sem dependências:

```bash
# qualquer servidor estático serve, por exemplo:
python3 -m http.server 8000
# e abra http://localhost:8000
```

Ou simplesmente abra o `index.html` no navegador. Também funciona direto no
GitHub Pages.

## Estrutura

```
index.html          # página única do app
css/style.css       # estilos
js/app.js           # cards, sorteio sem repetição e tela da prática
js/data/*.js        # 8 arquivos, 100 práticas cada (texto + fundamento)
```

> Estas práticas são um convite ao cuidado — não substituem acompanhamento
> médico ou psicológico.
